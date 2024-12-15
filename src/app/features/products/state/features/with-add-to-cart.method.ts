import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity, setEntity } from '@ngrx/signals/entities';
import { CartProductsState, cartProductsConfig } from '../products.store';

export const withAddToCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductsState>() },

		withMethods((store) => {
			return {
				addToCart: (product: CartProduct) => {
					let existing =
						store.cartProductsEntityMap()[product.variant.id];

					if (!existing)
						patchState(
							store,
							addEntity(product, cartProductsConfig),
						);
					else
						patchState(
							store,
							setEntity(
								{
									...existing,
									quantity:
										existing.quantity + product.quantity,
								},
								cartProductsConfig,
							),
						);
				},
			};
		}),
	);
