import fsSync from "node:fs";
import fs from "node:fs/promises";

export interface SerialRunnerOptions {
	/**
	 * How long to wait for the change to settle. Saving a file often produces
	 * more than one event, and a formatter or a bundler writing a directory
	 * produces a burst of them.
	 */
	debounceMs?: number;
}

export interface SerialRunner {
	/** Ask for a run. Safe to call at any rate. */
	trigger: () => void;
}

/**
 * Runs `task` on demand, never twice at once, and never more than once for a
 * burst of demands.
 *
 * Regenerating the site is the task this exists for: it reads the same output
 * directory it writes, so two overlapping runs would interleave into a tree
 * that matches neither. Requests arriving mid-run collapse into exactly one
 * follow-up run, so the last change is always reflected without queueing up a
 * run per keystroke.
 */
export const createSerialRunner = (
	task: () => Promise<void>,
	{ debounceMs = 40 }: SerialRunnerOptions = {},
): SerialRunner => {
	let timer: NodeJS.Timeout | undefined;
	let running: Promise<void> | undefined;
	let queued = false;

	const run = async () => {
		running = (async () => {
			try {
				await task();
			} catch (error) {
				console.error(error);
			}
		})();

		await running;
		running = undefined;

		if (queued) {
			queued = false;
			await run();
		}
	};

	return {
		trigger: () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = undefined;
				if (running) {
					queued = true;
					return;
				}
				void run();
			}, debounceMs);
		},
	};
};

export interface DirectoryWatcher {
	close: () => void;
}

/**
 * Watches directories recursively, skipping any that do not exist.
 *
 * A missing directory is not an error worth stopping for: `src/fleets/en` only
 * appears once there is an English fleet, and dev should still start without
 * one.
 */
export const watchDirectories = async (
	directories: string[],
	onChange: (directory: string, fileName: string | null) => void,
): Promise<DirectoryWatcher> => {
	const watchers: fsSync.FSWatcher[] = [];

	for (const directory of directories) {
		const exists = await fs
			.stat(directory)
			.then((stats) => stats.isDirectory())
			.catch(() => false);

		if (!exists) continue;

		const watcher = fsSync.watch(
			directory,
			{ recursive: true },
			(_event, fileName) => onChange(directory, fileName as string | null),
		);
		// A watch error (an editor swapping a directory out from under it, say)
		// should not take the whole dev session down with it.
		watcher.on("error", (error) => {
			console.error(`[watch] ${directory}:`, error);
		});
		watchers.push(watcher);
	}

	return {
		close: () => {
			for (const watcher of watchers) watcher.close();
		},
	};
};
