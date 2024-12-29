import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { CartStoreState } from '../cart.store';
import { featureType } from '@src/app/view/state/utils/utils';

export const withIncrementIdxMethods = <_>() =>
	signalStoreFeature(
		{ state: type<CartStoreState>() },

		withMethods((store) => {
			return {
				incrementAtIdx: (productIdx: number) => {
					patchState(store, {
						products: store
							.products()
							.map((p, i) =>
								i === productIdx
									? { ...p, quantity: p.quantity + 1 }
									: p,
							),
					});
				},

				decrementAtIdx: (productIdx: number) => {
					patchState(store, {
						products: store.products().map((p, i) =>
							i === productIdx
								? {
										...p,
										quantity:
											p.quantity <= 1
												? p.quantity
												: p.quantity - 1,
									}
								: p,
						),
					});
				},
			};
		}),
	);

const _i = featureType(withIncrementIdxMethods);
export type WithGetProductIdxMethodType = typeof _i.methods;
