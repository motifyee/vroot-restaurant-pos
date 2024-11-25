import { signal } from '@angular/core';
import { signalUpdater } from '../../util';
import { UI_FLASH, UI_LOADING, UIState, uiState, UIStateKey } from './ui-state';

/* eslint-disable @typescript-eslint/no-explicit-any */

//**
//  * used to automatically assign properties from `porps` to an `obj`.
//  * use exclude to manualy pass a class type to instantiate the value, or
//  * pass a function to transform the coresponding props' value to key
//  *
//  * @param obj object to assign properties to
//  * @param props properties to assign to `obj`
//  * @param exclude properties that are excluded from automatic assignment.
//  */
export function applyProps(
	self: IdxSignature,
	props: IdxSignature,
	exclude: IdxSignature = {},
): void {
	exclude = exclude ?? {};

	for (const key in props) {
		if (!Object.prototype.hasOwnProperty.call(props, key)) continue;

		let value = props[key];

		if (!(key in exclude)) {
			const t = typeof self[key];

			if (t === 'boolean') {
				if (typeof value === 'string') value = value === 'true';
				else value = !!value;
			} else if (t === 'number') value = +value;
			else if (t === 'bigint') value = BigInt(value);
			// else if (t === 'object') value = JSONParse(value);
			// else if (t === 'symbol') value = Symbol(value);
			self[key] = value;
			continue;
		}

		const baseClass = exclude[key];

		// applies for arrow functions only
		if (!baseClass?.prototype?.constructor) value = baseClass(value);
		else
			value = Array.isArray(value)
				? new (baseClass as typeof BaseArray<any>)(
						baseClass,
						exclude,
						value,
					)
				: new (baseClass as typeof Base<any>)(value);

		self[key] = value;
	}
}

export type ByRef<T> = {
	[key in keyof Partial<T>]:
		| typeof Base<any>
		| typeof BaseArray<any>
		| ((rawValue: any) => T[keyof T]);
};

export class Base<T> extends UIState {
	// IdxSignature here is for when the interface doesn't match the class
	private __props__?: Partial<T | IdxSignature>;
	private __byRef__?: ByRef<T>;

	// *...args: any[] ::
	//      => provided for type constructor compatibility with baseType
	constructor(...args: any[]) {
		super();
	}

	/**
	 * apply props to the class
	 *
	 * @param props value to map to the class
	 * @param byRef keys in props to instantiate a class with.
	 * @returns void
	 */
	mapProps(props: Partial<T | IdxSignature>, byRef?: ByRef<T>) {
		this.__props__ = props;
		this.__byRef__ = byRef;

		if (!this.__props__) return;
		applyProps(this, this.__props__, this.__byRef__);
	}
}

export class BaseArray<T> extends Array<Base<T>> {
	ctor: typeof Base<T>;
	byRef?: ByRef<T>;
	base = new Base<T>();

	constructor(baseClass: typeof Base<T>, byRef?: ByRef<T>, items: T[] = []) {
		super();

		this.ctor = baseClass;
		this.byRef = byRef;

		this.push(...items);
	}

	override push(...items: Base<T>[] | T[]): number {
		for (const obj of items) {
			if (obj instanceof this.ctor) super.push.apply(this, [obj]);
			else {
				let item = new this.ctor();
				item.mapProps(obj, this.byRef);
				super.push.apply(this, [item]);
			}
		}

		return super.length;
	}

	clear() {
		while (this.length) this.pop();
	}

	get empty() {
		return new BaseArray(this.ctor, this.byRef);
	}
}

export class IArray<T> extends Array<T> {
	base = new Base<T>();

	constructor(items: T[] = []) {
		super();

		this.push(...items);
	}

	clear() {
		while (this.length) this.pop();
	}

	get empty() {
		return new IArray<T>();
	}
}

export function baseAggregate<T extends Base<T>>(
	baseClass: Constructor<Base<T>>,
	...mixins: Constructor[]
): Base<T> {
	let base = class _Combined extends Base<T> {
		constructor(...args: any[]) {
			super(args);
			mixins.forEach((mixin) => {
				mixin.prototype.initializer.call(this);
			});
		}
	};

	let copyProps = (target: any, source: any) => {
		const props: any[] = Object.getOwnPropertyNames(source),
			symbols: Symbol[] = Object.getOwnPropertySymbols(source),
			descriptor = (prop: string) =>
				Object.getOwnPropertyDescriptor(source, prop);

		props.concat(symbols).forEach((prop) => {
			if (
				prop.match(
					/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/,
				)
			)
				return;
			Object.defineProperty(target, prop, descriptor(prop)!);
		});
	};

	mixins.forEach((mixin) => {
		copyProps(base.prototype, mixin.prototype);
		copyProps(base, mixin);
	});

	return base as unknown as Base<T>;
}

export const aggregation = (
	baseClass: Constructor<any>,
	...mixins: Constructor[]
) => {
	let base = class _Combined extends baseClass {
		constructor(...args: never[]) {
			super(...(args as []));
			mixins.forEach((mixin) => {
				mixin.prototype.initializer.call(this);
			});
		}
	};
	let copyProps = (target: any, source: any) => {
		const props: any[] = Object.getOwnPropertyNames(source),
			symbols: Symbol[] = Object.getOwnPropertySymbols(source),
			descriptor = (prop: string) =>
				Object.getOwnPropertyDescriptor(source, prop);

		props.concat(symbols).forEach((prop) => {
			if (
				prop.match(
					/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/,
				)
			)
				return;
			Object.defineProperty(target, prop, descriptor(prop)!);
		});
	};
	mixins.forEach((mixin) => {
		copyProps(base.prototype, mixin.prototype);
		copyProps(base, mixin);
	});
	return base;
};
