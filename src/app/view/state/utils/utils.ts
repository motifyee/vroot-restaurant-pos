import { ProviderToken } from '@angular/core';
import { SignalStoreFeature, type } from '@ngrx/signals';

export function storeType<T>(value: ProviderToken<T>): T {
	return undefined as never as T;
}

// #############################################################################

type MethodsDictionary = Record<string, (...args: any[]) => any>;

// TODO: never depend on interanl api types
export function featureMethodsType<T extends MethodsDictionary>(
	_: <_>() => SignalStoreFeature<
		any,
		{
			state: {};
			props: {};
			methods: T;
		}
	>,
) {
	return undefined as never as T;
}

// #############################################################################

// TODO: never depend on interanl api types
export function featureType<T extends { state: {}; props: {}; methods: {} }>(
	_: <_>() => SignalStoreFeature<any, T>,
) {
	return undefined as never as T;
}

// #############################################################################

// function entityConfigType<c extends typeof entityConfig>(
// 	config: typeof entityConfig,
// ) {
// 	return undefined as never as c;
// }

// function namedEntityStateType<Entity, Collection extends string>(
// 	collection: Collection,
// ) {
// 	type _Collection = typeof collection;
// 	return undefined as never as NamedEntityState<Entity, _Collection>;
// }
