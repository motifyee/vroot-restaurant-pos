import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { CartStoreState } from '../cart.store';
import { WithGetProductIdxMethodType } from './with-get-product-idx.method';

export const withAddToCartMethod = <_>() =>
	signalStoreFeature(
		{
			methods: type<WithGetProductIdxMethodType>(),
			state: type<CartStoreState>(),
		},

		withMethods((store) => {
			return {
				addToCart: (product: InvoiceProduct) => {
					const existingIdx = store.getProductIdx(product);

					if (existingIdx < 0)
						patchState(store, {
							products: [...store.products(), product],
						});
					else
						patchState(store, {
							products: store.products().map((p, i) =>
								i === existingIdx
									? {
											...p,
											quantity:
												p.quantity + product.quantity,
										}
									: p,
							),
						});
				},
			};
		}),
	);
