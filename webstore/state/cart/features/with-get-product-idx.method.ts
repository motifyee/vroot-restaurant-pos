import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { CartStoreState } from '../cart.store';
import { deepMatch } from '@src/app/view/state/app/utils/utils';
import { featureType } from '@src/app/view/state/utils/utils';

export const withGetProductIdxMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartStoreState>() },

		withMethods((store) => {
			return {
				getProductIdx: (product: CartVariant) => {
					const existingIdx = store.products().findIndex((p) => {
						const idsMatch = p.variant.id === product.variant.id;
						const additionsMatch = deepMatch(
							p.additions,
							product.additions,
						);

						return idsMatch && additionsMatch;
					});

					return existingIdx;
				},
			};
		}),
	);

const _i = featureType(withGetProductIdxMethod);
export type WithGetProductIdxMethodType = typeof _i.methods;
