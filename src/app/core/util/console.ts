// =============================================================================
//  groupCollapsed

const apply = (fn: Function, ...args: any[]) => {
	// if (args.length === 1 && Array.isArray(args))
	return fn.apply(args)();
};

export const log =
	(...args: any[]) =>
	() =>
		console.log(...args);
export const warn =
	(...args: any[]) =>
	() =>
		console.warn(...args);
export const info =
	(...args: any[]) =>
	() =>
		console.info(...args);
export const error =
	(...args: any[]) =>
	() =>
		console.error(...args);

// gc(['title', msg, warn(msg))
export const gc = (...args: any[]) => {
	console.groupCollapsed(args.shift());

	const _print = (e: any) => (typeof e === 'function' ? e() : log(e)());

	args.forEach(_print);

	console.groupEnd();
};
