import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntities } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsState } from '../products.store';

export const withEmptyCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsState>() },
		withMethods((store) => {
			return {
				emptyCart: () =>
					patchState(
						store,
						removeEntities(() => true, cartProductsConfig),
					),
			};
		}),
	);
