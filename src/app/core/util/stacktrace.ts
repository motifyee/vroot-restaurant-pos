// =============================================================================
// Capture calling function

// this is a hacky way
// works only in v8/chrome
// TODO better implementation
export const captureStackTrace = () => {
	let o = {};
	// @ts-ignore
	Error.captureStackTrace(o, captureStackTrace);
	// @ts-ignore
	return o.stack;
};
// TODO implement for firefox && opera && safari
const classMethod = '_StackTrace',
	newClass = 'new ' + classMethod;
export class StackTrace {
	_stack = StackTrace.stack();
	constructor() {}

	static stack(): string[][] {
		let stack = (new Error('').stack || '').split('\n'),
			stacktail = [] as string[][],
			clean = stack
				.map((line) => {
					line = line.replace(/^\s*at\s+/, '');
					if (
						line.startsWith(classMethod) ||
						line.startsWith(newClass) ||
						line.trim() === 'Error'
					)
						return (
							stacktail.push([
								'stack_tail',
								...line.split(/\s+/),
							]) && null
						);

					return line.split(/\s+/);
				})
				.filter((e) => !!e) as string[][];

		return [...clean, ...stacktail];
	}

	static fnPosition(fnName: string) {
		return new StackTrace().getFnPosition(fnName);
	}
	static nthFn(idx: number) {
		return new StackTrace().getNthFn(idx);
	}
	static parent() {
		return StackTrace.nthFn(0);
	}

	getFnPosition(fnName: string) {
		fnName = fnName.toLowerCase().replace('/^_', '');
		return this._stack.findIndex((s) => {
			let idx = s[0] != 'new' ? 0 : 1;

			return s[idx].toLowerCase().replace('/^_', '') === fnName;
		});
	}

	getNthFn(idx: number) {
		return this._stack[idx];
		// return item === 'new' ? this._stack[idx + 1] : item;
	}

	getParent() {
		return this.getNthFn(0);
	}
}

// gets the position in the stack for a function's name
// -1 for not found
