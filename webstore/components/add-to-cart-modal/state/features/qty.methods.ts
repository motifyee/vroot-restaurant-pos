import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { AddToCartStoreState } from '../add-to-cart.store';

export const withQtyMethods = <_>() =>
	signalStoreFeature(
		{ state: type<AddToCartStoreState>() },

		withMethods((store) => {
			return {
				incrementQty: () => {
					patchState(store, { quantity: store.quantity() + 1 });
				},

				decrementQty: () => {
					if (store.quantity() > 1) {
						patchState(store, { quantity: store.quantity() - 1 });
					}
				},

				setQty: (qty: number) => {
					if (qty > 0) patchState(store, { quantity: qty });
				},
			};
		}),
	);
