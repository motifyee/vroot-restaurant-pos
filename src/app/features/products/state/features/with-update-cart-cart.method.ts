import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { setEntity } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsState } from '../products.store';

export const withUpdateCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsState>() },
		withMethods((store) => {
			return {
				updateCart: (product: CartProduct) =>
					patchState(store, setEntity(product, cartProductsConfig)),
			};
		}),
	);
