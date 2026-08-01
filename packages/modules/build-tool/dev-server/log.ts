const DIM = "\u001B[2m";
const BOLD = "\u001B[1m";
const RED = "\u001B[31m";
const RESET = "\u001B[0m";

/** So callers never have to spell an escape sequence out themselves. */
export const style = {
	dim: (text: string) => `${DIM}${text}${RESET}`,
	bold: (text: string) => `${BOLD}${text}${RESET}`,
	red: (text: string) => `${RED}${text}${RESET}`,
};

/**
 * The dev output is a running log of steps that each take a noticeable amount
 * of time, so every line carries a clock time and a duration -- that is what
 * makes "which step is the slow one" answerable without reaching for a profiler.
 */
const clock = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

export const devLog = (message: string) => {
	console.log(`${DIM}[${clock()}]${RESET} ${message}`);
};

export const devError = (message: string, error?: unknown) => {
	console.error(`${DIM}[${clock()}]${RESET} ${RED}${message}${RESET}`);
	if (error !== undefined) console.error(error);
};

/** Runs `task`, logging what it was and how long it took. */
export const timed = async <T>(
	label: string,
	task: () => Promise<T>,
): Promise<T> => {
	const startedAt = performance.now();
	const result = await task();
	const duration = (performance.now() - startedAt) / 1000;
	devLog(`${label} ${DIM}${duration.toFixed(2)}s${RESET}`);
	return result;
};
