import { effect, Injector, WritableSignal } from '@angular/core';

// updates Objects
export function updateObjSignal<T>(
	signal: WritableSignal<T>,
	value: Partial<T> | ((value: T) => Partial<T>),
) {
	let fn: (value: T) => Partial<T>;
	if (typeof value != 'function') fn = (_: T) => value as Partial<T>;
	else fn = value;

	signal.update((v) => ({
		...v,
		...(fn as Function)(v),
	}));
}

export function updateMapSignal<K, V>(
	signal: WritableSignal<Map<K, V>>,
	value: { K: V } | [K, V][] | ((value: Map<K, V>) => Map<K, V>),
) {
	signal.update((map) => {
		if (Array.isArray(value)) for (const [k, v] of value) map.set(k, v);
		else if (typeof value === 'function') map = value(map);
		else for (const [k, v] of Object.entries(value)) map.set(k as K, v);

		return map;
	});
}

export function signalUpdater<T>(signal: WritableSignal<T>) {
	return (fn: Partial<T> | ((value: T) => Partial<T>)) =>
		updateObjSignal<T>(signal, fn);
}

export function mapSignalUpdater<K, V>(signal: WritableSignal<Map<K, V>>) {
	return (value: { K: V } | [K, V][] | ((value: Map<K, V>) => Map<K, V>)) =>
		updateMapSignal(signal, value);
}

/**
 * Creates a one-time effect that executes a success callback when a predicate becomes true.
 * The effect automatically destroys itself after executing.
 *
 * @param params Configuration object for the single call effect
 * @param params.injector Angular injector instance for effect context
 * @param params.init Optional initialization function called before setting up the effect
 * @param params.predicate Function that determines when to trigger the success callback
 * @param params.success Callback function executed when predicate becomes true
 *
 * @example
 * ```ts
 * // Wait for user data to be available before proceeding
 * singleCallEffect({
 *   injector: this.injector,
 *   predicate: () => !!this.userData,
 *   init: () => this.showLoading(),
 *   success: () => this.proceedWithUserData()
 * });
 * ```
 *
 * Note: Uses setTimeout internally to avoid Angular's NG0602 error when effects
 * are called sequentially within a reactive context.
 */
export function singleCallEffect(params: {
	injector: Injector;
	init?: () => void;
	predicate: () => boolean;
	success: () => void;
}) {
	const { injector, predicate, init, success } = params;

	init?.();

	let x = effect(
		() => {
			if (!predicate()) return;
			// setTimeout: to avoid Error NG0602 in case of sequential effect calls
			// in other words avoid calling effect from within a reactive contect
			// success();
			setTimeout(success, 0);
			x.destroy();
		},
		{ injector },
	);
}
