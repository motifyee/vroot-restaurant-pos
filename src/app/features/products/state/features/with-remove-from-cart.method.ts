import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsState } from '../products.store';

export const withRemoveFromCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsState>() },
		withMethods((store) => {
			return {
				removeFromCart: (product: CartProduct) =>
					patchState(
						store,
						removeEntity(product.variant.id, cartProductsConfig),
					),
			};
		}),
	);
