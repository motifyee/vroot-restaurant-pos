// =============================================================================
// JSON

export function JSONParse(value: string, defaultValue?: never) {
	try {
		return JSON.parse(value);
	} catch (error) {
		if (typeof defaultValue !== 'undefined') return defaultValue;
		return value;
	}
}

export function stringifyMap(map: Map<any, any>) {
	let obj = Object.fromEntries(map);
	return JSON.stringify(obj);
}

export function parseMap<T>(str: string, constructor: Constructor<T>) {
	let obj: { [key: string]: T };
	try {
		obj = JSON.parse(str);
	} catch (err) {
		console.error(err);
		obj = {};
	}

	if (constructor)
		Object.entries(obj).forEach(([key, value]) => {
			try {
				obj[key] = new constructor(value);
			} catch (error) {
				obj[key] = new constructor({});
			}
		});

	return new Map<string, T>(Object.entries(obj));
}
