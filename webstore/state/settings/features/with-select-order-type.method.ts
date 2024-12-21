import { computed } from '@angular/core';
import {
	patchState,
	signalStoreFeature,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';

type State = {
	orderType: null | 'pickup' | 'delivery';
};

const initialState: State = {
	orderType: null,
};

export function withSelectOrderTypeMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withComputed((store) => {
			return {
				orderTypeId: computed(
					() =>
						store.orderType() &&
						{
							pickup: 3,
							delivery: 4,
							indoor: 5,
						}[store.orderType()!],
				),
			};
		}),
		withMethods((store) => {
			return {
				selectOrderType: (orderType: 'pickup' | 'delivery') => {
					patchState(store, { orderType });
				},
			};
		}),
	);
}
