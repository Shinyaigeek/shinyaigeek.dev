export const LIVE_RELOAD_ENDPOINT = "/__dev__/live-reload";

/**
 * Injected into every HTML response rather than bundled into the client entry,
 * so it only ever exists in what the dev server hands out and no part of the
 * generated site knows about it.
 *
 * The generation number, not the connection itself, is what decides to reload.
 * EventSource reconnects on its own, so a page that reloaded on every `open`
 * would also reload whenever the laptop woke up or the dev server was
 * restarted, which is how a plain "reload on reconnect" implementation ends up
 * fighting the person using it. Comparing generations means a reconnect to the
 * same build is a no-op, while a reconnect to a server that has rebuilt since
 * -- including a freshly restarted one, whose generation starts over -- still
 * reloads.
 */
export const liveReloadSnippet = (): string => `
<script>
(() => {
	let generation = null;
	const source = new EventSource(${JSON.stringify(LIVE_RELOAD_ENDPOINT)});
	source.addEventListener("generation", (event) => {
		const next = event.data;
		if (generation === null) {
			generation = next;
			return;
		}
		if (generation !== next) {
			location.reload();
		}
	});
})();
</script>
`;

/**
 * Puts the snippet just before </body> so it runs after the document it is
 * watching, and appends it when there is no </body> to find -- an OG image
 * route or a hand written fragment is still worth reloading.
 */
export const injectLiveReload = (html: string): string => {
	const snippet = liveReloadSnippet();
	const closingBody = html.lastIndexOf("</body>");

	if (closingBody === -1) {
		return html + snippet;
	}

	return html.slice(0, closingBody) + snippet + html.slice(closingBody);
};
