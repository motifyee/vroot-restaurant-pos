import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import { cartProductsConfig, CartProductsConfig } from '../products.store';

export const withRemoveFromCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsConfig>() },
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
