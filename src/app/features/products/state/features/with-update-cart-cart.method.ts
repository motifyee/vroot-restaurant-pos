import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { setEntity } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsConfig } from '../products.store';

export const withUpdateCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsConfig>() },
		withMethods((store) => {
			return {
				updateCart: (product: CartProduct) =>
					patchState(store, setEntity(product, cartProductsConfig)),
			};
		}),
	);
