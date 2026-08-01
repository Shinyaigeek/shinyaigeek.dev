---
title: qain, a style-regression testing tool that reports what changed and how
tags: [Programming, TypeScript, Frontend, DX, CSS, OSS]
description: Pixel VRT can only tell you that two images differ. I built qain, a style-regression testing tool that pulls the structure Chromium consults while painting out over CDP and diffs it semantically.
publishedAt: 2026/08/01
updatedAt: 2026/08/01
---

## What is this?

Hi, I am [Shinyaigeek](https://twitter.com/Shinyaigeek).

I built qain, a semantic style-regression testing tool for the browser. Instead of screenshotting the page, it records the structure Chromium consults while painting your content as a JSON snapshot, and diffs two snapshots property by property. What goes into a snapshot is the computed style, layout box, paint order and composited background color resolved out of your HTML and CSS — the values the browser settled on after deciding "draw this, here, like this".

[https://github.com/Shinyaigeek/qain](https://github.com/Shinyaigeek/qain)

The docs, a live demo you can play with, and an in-browser playground are here.

- [shinyaigeek.github.io/qain](https://shinyaigeek.github.io/qain/)
- [shinyaigeek.github.io/qain/docs](https://shinyaigeek.github.io/qain/docs/)

## Motivation

Visual regression testing mostly means screenshot diffing. Percy and Chromatic do it in the cloud with a review queue in front, Playwright's `toHaveScreenshot` and BackstopJS do it locally against golden images, but either way the answer that comes back is an image with red pixels on it. That is what bothered me.

There are two problems with it.

The first one comes from the answer being an image at all. You learn where something changed, but not what changed or why, so you end up putting two screenshots side by side and squinting. And since you are looking at pixels, it is inherently flaky: font rendering differs across operating systems and machines, and antialiasing or a one-pixel kerning shift will happily turn the diff red. Once a suite fails on differences nobody intends to fix, it tends to end up either with a loosened threshold or with everyone ignoring the failures.

The second problem showed up more recently. That squinting is not something you can hand to a coding agent. Passing `diff.png` to an LLM and asking "which CSS declaration caused this regression?" is a fairly unreasonable question to ask. What used to be merely inconvenient for a human turns into a wall when an agent is on the other end.

So qain answers in a different unit. Properties.

## Example

`examples/` holds a billing page and a commit that breaks it four ways at once. Embedded below is the HTML that came out of running those two through `qain diff --replay`, pasted in as is. Drag the slider to swap between before and after; nodes that caused a change are outlined in red, and the ones that were merely dragged along are in grey.

<iframe src="/assets/introduction-qain/replay.html" title="qain replay: fading between the before and after reconstructions" loading="lazy" sandbox="allow-scripts" style="width:100%;height:min(720px, 80vh);border:0;border-radius:8px"></iframe>

The same thing lives at [shinyaigeek.github.io/qain](https://shinyaigeek.github.io/qain/), where CI regenerates it from `examples/` on every run. The in-browser playground is there too.

Now, where a pixel diff stops at "some pixels are red", here is what qain says.

```
default state
  html > body > header > span[data-testid=plan-badge]
    z-index: 2 → 0
    paint order: 4 → 3 (stacking changed)
    ← .badge { z-index: 2 → 0 }  theme.regressed.css:21:3
  html > body > main > section[data-testid=usage-card] > p[data-testid=usage-note]
    color: rgb(107, 114, 128) → rgb(199, 203, 212)
    contrast 4.83 → 1.63  ✗ falls below WCAG AA-normal
    ← .muted { color: rgb(107, 114, 128) → rgb(199, 203, 212) }  theme.regressed.css:30:3
  html > body > main > div > button[data-testid=pay]
    resized 0px × +12px
    ← .btn { padding: 8px 16px → 14px 16px }  theme.regressed.css:4:3
  ...

:hover
  html > body > main > div > button[data-testid=pay]
    background-color: rgb(29, 78, 216) → rgb(37, 99, 235)
    contrast 6.7 → 5.17
    ← .btn-primary:hover { background: rgb(29, 78, 216) → rgb(37, 99, 235) }  theme.regressed.css:15:3
  ...

39 changes: 14 primary, 25 derived
```

Four regressions, each with a selector, a value and a `file:line` for its cause. The 25 elements that only moved because a button above them grew are folded away as consequences (derived). The same commit also rehashes every utility class name, and qain reports nothing about that, because not one pixel of the rendering changed.

## How to use?

```sh
npx playwright install chromium    # qain drives a real Chromium over CDP
npx @qain/cli snap https://example.com --rules -o page.json
```

That alone gives you a style snapshot of any URL a browser can open. Then you capture twice, before and after your change, and diff them.

```sh
qain snap http://localhost:3000 --rules --replay -o before.json
# ... change the code ...
qain snap http://localhost:3000 --rules --replay -o after.json
qain diff before.json after.json --omit-derived
```

The exit code is 1 when the diff is not empty, so CI or an agent can gate on it directly. `--json` gives you structured data, and `--html report.html` writes a standalone page you can open on its own.

If you would rather write assertions, there are matchers for each test runner. Where baselines live and how they are updated follows each runner's own conventions.

**Playwright**

```ts
import { expect, test } from "@qain/playwright";

test("home page styles", async ({ page }) => {
    await page.goto("/");
    await expect(page).toMatchStyleSnapshot({ states: ["hover", "focus-visible"] });
});
```

**Vitest browser mode**

```ts
import { render } from "vitest-browser-react";
import { test } from "vitest";
import { expect } from "@qain/vitest";

test("primary button", async () => {
    render(<Button variant="primary">Pay</Button>);
    await expect(document.body).toMatchStyleSnapshot({ states: ["hover", "focus-visible"] });
});
```

**Storybook test runner**

```ts
// .storybook/test-runner.ts
import { matchStyleSnapshot } from "@qain/storybook";

export default {
    async postVisit(page, context) {
        await matchStyleSnapshot(page, context);
    },
};
```

With Storybook, one line in the test runner's `postVisit` turns every story into a style test. That said, I think the natural home for component-level VRT is `@vitest/browser`, which already mounts one component in a real Chromium, and `@qain/vitest` aims at exactly that. No Storybook boot, and it runs in parallel per test.

## The idea behind it

Recording DOM and CSS as they are and comparing them, done naively, is unusable. Not that looking at everything is wrong in itself: comparing all 420 properties `getComputedStyle` returns is, in the sense of missing nothing, the right thing to do. The problem was the shape of what comes back.

Rewrite one CSS variable like `--brand`, and the `color`, the `border-color` and the `fill` of every element referencing it all resolve to different values at once. Hundreds of differences is a correct answer here — hundreds of places really did render differently. But when those hundreds arrive flat, all carrying the same weight, the one thing that gets lost is the structure: one edit, and its consequences. That structure is usually what you wanted. So qain does not hide differences to bring the count down. It attaches the cause-and-effect relationship to those hundreds instead.

The premise underneath is that a DOM element itself is allowed to change. Depending on the library your class names get rewritten on every build, a `<div>` can be inserted at the top of a list, a tag can be swapped for another one as the markup evolves. What does not change under any of that is what you are trying to draw and how. That is the only side worth looking at, so that is the side the comparison is keyed on.

Which is why `class` is recorded but never compared. Tailwind's JIT and CSS Modules rewrite class strings on every build, and the rendering is identical.

Elements are matched by key rather than by position in the DOM: `data-testid`, then `id`, then accessible role + name, then a sibling ordinal. Insert one `<div>` at the top of a list and the report is one addition, not a rewritten subtree.

The set of properties actually recorded is narrowed from 420 to around 60. qain calls that set the projection, and only two kinds of things are left out of it.

The first is anything the layout box already says. `padding`, `margin`, `width`, `height`, `inset`, `flex-basis` and friends all resolve into the element's rectangle (`bounds`), and `bounds` is captured anyway. Keeping both means that changing a button's `padding` from 8px to 14px reports "padding changed" and "height grew by 12px" as two findings. Only one thing happened, so qain keeps the effect — `bounds` — and buys the cause back through `--rules`, which is the next section. The second is anything a human would not notice changing. `math-depth`, `-webkit-locale`, `text-rendering` and the font-synthesis family never really reach the pixels.

The cause-and-effect labels mentioned above are `primary` and `derived`. When that button grows 12px taller, everything below it shifts down by 12px. If each of those shifted elements reports "my position changed", one regression balloons into dozens. So qain separates elements that changed for their own reasons (primary) from elements that ended up that way because something else pushed them (derived). A parent that only grew to fit its child is derived too, and the `border-color` or `caret-color` that follow a single `color` change through `currentColor` are folded into that one `color` finding. `--omit-derived` leaves only the causes, which is how I usually read it. It only collapses the display — drop the flag and every derived change is still there.

One more thing: dropping pixels does not remove every source of flakiness. Font rendering differs between operating systems and machines, and webfonts swap in late, so depending on when you capture, every element can look like its `font-family` changed. I decided to absorb that structurally. Snapshots are taken after `document.fonts.ready`, and sub-pixel box movement below `--tolerance` (0.5px by default) is not treated as a change. Without a place in the tool where that absorption happens, it ends up growing as ignores scattered across individual tests.

## Naming the CSS rule behind a change

With `--rules`, the matched CSS declarations are recorded alongside the snapshot, and the diff uses them to point at the line that caused each change.

```
button[data-testid=submit]
  resized 0px × +24px
  ← .btn { padding: 8px 16px → 20px 16px }  buttons.css:3:3
```

`padding` is not in the projection, as described above. It is left out on purpose because the box reports the effect, and this is where the cause that was dropped gets bought back from the declaration its author wrote — and only for the nodes that changed.

Picking that declaration means resolving the cascade properly, `!important` and inline styles included, and taking the one that actually wins. The report is also folded back to the granularity a human wrote: change `padding-top` and it still comes out as `padding: 8px 16px → 14px 16px`, in the shape of the original declaration. Attribution is per state, so a hover regression names `.btn-primary:hover`. It will not point at the resting `.btn`.

Sometimes no declaration is behind the change at all — a longer label widened the button, say. In that case qain will not falsely accuse some rule that happens to mention `width`; it says `no CSS declaration on this node changed`. Derived changes have their cause in another node, so they are not attributed in the first place.

The cost is one CDP round-trip per node and roughly 3× the snapshot size. Hence opt-in.

## Pseudo-states

You can capture a snapshot with `:hover` or `:focus-visible` forced through CDP. Against pixel VRT, which cannot do this without synthesising real pointer input, I think that is a quietly useful difference.

That said, a page where every button is in `:hover` at once is a state that never occurs in a browser. It is only safe if hovering changes nothing outside the hovered elements, so `strategy: 'auto'` (the default) takes one bulk snapshot, verifies that nothing outside the forced subtrees moved or restyled, and silently falls back to one snapshot per element when something did. A `:hover` that changes `padding` displaces its siblings, and `.btn:hover ~ .panel` restyles a node that is not hovered. Both are caught. Neither is guessed at.

## Replay

`qain view` rebuilds the page itself out of a snapshot. Not a single image is involved. And the reconstruction is exact.

```sh
qain snap http://localhost:3000 --replay -o page.json
qain view page.json -o page.html
```

Below is the output of running `examples/baselines/home.qain.json` through `qain view`, pasted in as is. Since it is not an image, you can select the text, and zooming with ⌘/Ctrl + scroll keeps the glyphs crisp.

<iframe src="/assets/introduction-qain/view.html" title="a page rebuilt from a snapshot by qain view" loading="lazy" sandbox="allow-scripts" style="width:100%;height:min(560px, 70vh);border:0;border-radius:8px"></iframe>

The key is that replay never runs layout again. Every element is placed at the rectangle Chromium gave it, and every line of text at the rectangle Chromium gave that line (`--replay` records those; `DOMSnapshot` hands them back alongside the boxes). Nothing cascades, nothing reflows, nothing depends on the viewport, so there is no room for the result to come out subtly different from what was recorded. That the rebuilt page is pixel-identical to the original is asserted in the e2e suite.

This is also why the projection can omit `padding`. A button's text run sits eighteen pixels inside its border box, and that offset is the padding — already resolved. Margins, flex distribution, text alignment and the line breaks in a wrapped paragraph all come back through the same route.

`qain diff a.json b.json --replay out.html` writes both reconstructions into one page. Look at them side by side, or stack them with an opacity slider. A four-pixel shift is invisible in two images next to each other, and obvious the moment you fade one into the other.

## Contrast

Chromium reports the composited background color (`blendedBackgroundColors`), so qain can compute WCAG contrast against the color that actually reaches the eye. Put a half-opaque white panel over blue and what enters the calculation is `rgb(128, 128, 255)`, not the `rgba(255, 255, 255, 0.5)` you declared. A ratio that crosses a threshold is reported by name.

## GitHub Action

The `qain-diff` action watches the baselines committed in your repository. When a pull request changes one, it diffs the file against its merge-base version and posts the semantic diff in a single sticky comment, with before / after / diff screenshots attached. It updates in place on every push, and deletes the comment once the difference is gone (when the change is reverted, for instance).

You never tell it which files to watch: it matches what the PR actually changed against a glob.

```yaml
- uses: Shinyaigeek/qain/.github/actions/qain-diff@v0.0.3
  with:
      pattern: |
          **/__qain__/*.qain.json
          **/qain-snapshots/*.qain.json
```

`fail-on-diff` is off by default. A baseline update is usually intentional, so explaining it seemed more right than blocking on it.

## What it does not do

There are real trade-offs. What qain looks at are the values used for painting, not the pixels themselves.

- Regressions inside a gradient, in an image's content, or in antialiasing itself are invisible to it. `qain shot` exists for eyes, but when pixel-perfect rendering is the thing under test, you should just use pixel VRT
- It is Chromium only. `DOMSnapshot.captureSnapshot` and `CSS.forcePseudoState` have no Firefox or WebKit equivalent, and qain is built on both. The pixel tools win here
- Rotations and skews cannot be replayed. `bounds` is post-transform but axis-aligned, so a rotated element comes back as its bounding box
- Pseudo-elements cannot be attributed. `::before` rules arrive under the host's `pseudoElements`, which qain does not read yet
- CSS-in-JS cannot be traced back to source. emotion and chakra inject a `<style>` at runtime, so `--rules` points at that injected sheet. The `file:line` is real, but it is not the `.tsx` recipe that emitted it

## Upgrading a UI library

Having built it, the place it helps most is upgrading a UI library. Wanting to confirm that nothing looks different after a bump is a common enough story, but with a pixel diff that confirmation becomes a human deciding, one red patch at a time, whether this was the intended change. With qain you get the changed properties next to the declarations behind them, so you can read it as "this 12px is the library's own `.btn` padding changing". Judging whether a change was intended from the contents of the diff, rather than by eye, is what made the upgrade itself something I can step through with confidence.

And when the bump does carry a breaking change, qain turns into a harness. `qain diff` returns exit code 1 for as long as the diff is non-empty, so you can hand a coding agent "fix this until it reaches 0" and let it run the loop itself: fix, recapture, still some left. What reaches the agent is text saying which property on which node changed because of which declaration, so the agent can decide what to touch next on its own. That makes the loop run rather differently from showing it a `diff.png` and asking it to make things look right.

## Feedback

qain answers style regressions in properties instead of images. No cloud, no review queue, no golden images — just two JSON files, a text report and an exit code. Wanting a shape that a human can read and that can be handed straight to an LLM was, in the end, the biggest motivation.

It is still v0.0.4 and there is plenty that is rough. `npx @qain/cli snap <url>` only needs a URL to try, so bug reports and feature requests are very welcome!

```sh
pnpm add -D @qain/cli         # CLI
pnpm add -D @qain/playwright  # Playwright matcher
pnpm add -D @qain/vitest      # Vitest browser-mode matcher
pnpm add -D @qain/storybook   # Storybook test-runner matcher
pnpm add -D @qain/core        # library
```
