---
title: Treeche, Tree-Shakable Checker for JavaScript/TypeScript Application to reduce bundle size
tags: [Programming, JavaScript, DX, Frontend]
description: I introduce treeche, an npm module to check whether or not your JavaScript/TypeScript module is tree-shakable. This is useful to reduce bundle size
publishedAt: 2022/08/27
updatedAt: 2022/08/27
---

## What is Treeche?

Treeche stands for **Tree** -Shakable **Che** cker. You can check whether or not your JavaScript/TypeScript Application is tree-shakable with Treeche, and this diagnose will allow you to reduce bundle size and optimize UserExperience!!

[https://github.com/Shinyaigeek/treeche](https://github.com/Shinyaigeek/treeche)

## Example

```typescript
// this is not tree-shakable because have side-effect

const currentYear = new Date().getFullYear();

export function getCurrentYear() {
    return `Year ${currentYear}`
}
```

The above code is not tree-shakable, because the above typescript module has side-effect.

Treeche show the diagnose like below for the above code:

```cli
🚨 ~/application/side_effect.ts is not tree-shakable due to the following code:


const currentYear = new Date().getFullYear();
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

If you fix the module with side-effect to the module which does not have side-effect like below.

```typescript
export function getCurrentYear(currentDate: Date) {
    return `Year ${currentDate.getFullYear()}`
}
```

and Treeche will show the diagnose like below:

```cli
Congratulation 🎉 All files are tree-shakeable ✨
```

## What is side-effect in the context of module bundling?

A side-effect in ECMAScript module context is a code that effects outside the module. For example, it is side-effect to set a variable to `window` object in module top-level like below:

```javascript
window.m = 1;
export mod() {
    return 1;
}
```

Of course, if this were to happend in `init` module, this will not be invoked on import so this will no longer be a side effect.

## Why does side-effect cause an increase of bundle-size?

You can check bundler's behavior with rollup relp:

URL: [https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmV4cG9ydCUyMGZ1bmN0aW9uJTIwZnVnYSgpJTIwJTdCJTVDbiU1Q3RyZXR1cm4lMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lN0QlMjIlN0QlNUQlMkMlMjJvcHRpb25zJTIyJTNBJTdCJTIyZm9ybWF0JTIyJTNBJTIyZXMlMjIlMkMlMjJuYW1lJTIyJTNBJTIybXlCdW5kbGUlMjIlMkMlMjJhbWQlMjIlM0ElN0IlMjJpZCUyMiUzQSUyMiUyMiU3RCUyQyUyMmdsb2JhbHMlMjIlM0ElN0IlN0QlN0QlMkMlMjJleGFtcGxlJTIyJTNBbnVsbCU3RA==](https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmV4cG9ydCUyMGZ1bmN0aW9uJTIwZnVnYSgpJTIwJTdCJTVDbiU1Q3RyZXR1cm4lMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lN0QlMjIlN0QlNUQlMkMlMjJvcHRpb25zJTIyJTNBJTdCJTIyZm9ybWF0JTIyJTNBJTIyZXMlMjIlMkMlMjJuYW1lJTIyJTNBJTIybXlCdW5kbGUlMjIlMkMlMjJhbWQlMjIlM0ElN0IlMjJpZCUyMiUzQSUyMiUyMiU3RCUyQyUyMmdsb2JhbHMlMjIlM0ElN0IlN0QlN0QlMkMlMjJleGFtcGxlJTIyJTNBbnVsbCU3RA==)


**main.js**
```javascript
import { hoge } from "./mod";

console.log(hoge())
```

**mod.js**
```javascript
export function hoge() {
	return 1;
}

export function fuga() {
	return new Date().getFullYear();
}
```

and bundled result by rollup is like above:
```javascript
function hoge() {
	return 1;
}

console.log(hoge());
```

You know `fuga` module in `mod.js` is tree-shaken because the bundler know `fuga` module is not imported( and of course not used) and the bundler does not need to include `fuga` module to its bundle output, and this lead a decrease of bundle-size.

However, if your edit `mod.js` like below:
```javascript
export function hoge() {
	return 1;
}

const _fuga = new Date().getFullYear();

export function fuga() {
	return _fuga;
}
```

the bundled output will be like above:
```javascript
function hoge() {
	return 1;
}

new Date().getFullYear();

console.log(hoge());
```

[https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmNvbnN0JTIwX2Z1Z2ElMjAlM0QlMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lNUNuZXhwb3J0JTIwZnVuY3Rpb24lMjBmdWdhKCklMjAlN0IlNUNuJTVDdHJldHVybiUyMF9mdWdhJTNCJTVDbiU3RCUyMiU3RCU1RCUyQyUyMm9wdGlvbnMlMjIlM0ElN0IlMjJmb3JtYXQlMjIlM0ElMjJlcyUyMiUyQyUyMm5hbWUlMjIlM0ElMjJteUJ1bmRsZSUyMiUyQyUyMmFtZCUyMiUzQSU3QiUyMmlkJTIyJTNBJTIyJTIyJTdEJTJDJTIyZ2xvYmFscyUyMiUzQSU3QiU3RCU3RCUyQyUyMmV4YW1wbGUlMjIlM0FudWxsJTdE](https://rollupjs.org/repl/?version=2.78.1&shareable=JTdCJTIybW9kdWxlcyUyMiUzQSU1QiU3QiUyMm5hbWUlMjIlM0ElMjJtYWluLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMCU3QiUyMGhvZ2UlMjAlN0QlMjBmcm9tJTIwJTVDJTIyLiUyRm1vZCU1QyUyMiUzQiU1Q24lNUNuY29uc29sZS5sb2coaG9nZSgpKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZC5qcyUyMiUyQyUyMmNvZGUlMjIlM0ElMjJleHBvcnQlMjBmdW5jdGlvbiUyMGhvZ2UoKSUyMCU3QiU1Q24lNUN0cmV0dXJuJTIwMSUzQiU1Q24lN0QlNUNuJTVDbmNvbnN0JTIwX2Z1Z2ElMjAlM0QlMjBuZXclMjBEYXRlKCkuZ2V0RnVsbFllYXIoKSUzQiU1Q24lNUNuZXhwb3J0JTIwZnVuY3Rpb24lMjBmdWdhKCklMjAlN0IlNUNuJTVDdHJldHVybiUyMF9mdWdhJTNCJTVDbiU3RCUyMiU3RCU1RCUyQyUyMm9wdGlvbnMlMjIlM0ElN0IlMjJmb3JtYXQlMjIlM0ElMjJlcyUyMiUyQyUyMm5hbWUlMjIlM0ElMjJteUJ1bmRsZSUyMiUyQyUyMmFtZCUyMiUzQSU3QiUyMmlkJTIyJTNBJTIyJTIyJTdEJTJDJTIyZ2xvYmFscyUyMiUzQSU3QiU3RCU3RCUyQyUyMmV4YW1wbGUlMjIlM0FudWxsJTdE)

Why is an unnecessary `new Date().getFullYear()` in the bundled output? Because `new Date().getFullYear()` has side-effect. In JavaScript, imported module is executed once on import, so a bundler cannot remove a line which have side-effect like `new Date().getFullYear()`. If you import `fuga` module, it is expected that `new Date().getFullYear()` will be inserted in a bundled output, but if you don't import `fuga` module, it is not expected that `new Date().getFullYear()` will be inserted in a bundled output because the other module, `hoge`, does not need `const _fuga = new Date().getFullYear()` !!

## How to use?

First, global install Treeche.

```cli
npm install treeche -g
treeche "**/*.ts" --excludes "node_modules" "**/*.test.ts"
```

## Options

|kind|name|description|example|
|:--:|:--:|:--:|:--:|
|argument|inputs|input files to check tree-shakable. you can use Node glob pattern| treeche "src/**/*.ts"|
|option|excludes|excludes files to filter from inputs. you can use Node glob pattern| treeche "src/**/*.ts" --e "node_modules"|
|option|entry point|the unique entry point to check tree-shakable. if you specify input with this, treeche will bundle so you can check tree-shakable also in node_modules| treeche --entry-point ./src/main.ts|

## How to work?

The principle is really simple. Treeche runs rollup, which is JavaScript module bundler, internally to bundle the virtual entrypoint code which imports the input module like below.

```javascript

import "./your-module"

```

If there is a side-effect in "./your-module", the output will include the code other than import.

## Feedback

This is experimental project, so your feedback is welcome!!

