import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntities } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsConfig } from '../products.store';

export const withEmptyCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsConfig>() },
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
