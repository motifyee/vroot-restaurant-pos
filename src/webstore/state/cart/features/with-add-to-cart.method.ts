import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity, setEntity } from '@ngrx/signals/entities';
import {
	CartProductEntityState,
	cartProductsEntityConfig,
} from '../cart.store';

export const withAddToCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductEntityState>() },

		withMethods((store) => {
			return {
				addToCart: (product: CartProduct) => {
					let existing =
						store.cartProductEntityMap()[product.variant.id];

					if (!existing)
						patchState(
							store,
							addEntity(product, cartProductsEntityConfig),
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
								cartProductsEntityConfig,
							),
						);
				},
			};
		}),
	);
