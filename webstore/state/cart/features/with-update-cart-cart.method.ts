import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { CartStoreState } from '../cart.store';
import { WithGetProductIdxMethodType } from './with-get-product-idx.method';

export const withUpdateCartMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<CartStoreState>(),
			methods: type<WithGetProductIdxMethodType>(),
		},
		withMethods((store) => {
			return {
				updateCartProduct: (product: InvoiceProduct) => {
					const existingIdx = store.getProductIdx(product);
					if (existingIdx < 0) return;

					patchState(store, {
						products: store
							.products()
							.map((p, i) => (i === existingIdx ? product : p)),
					});
				},
			};
		}),
	);
