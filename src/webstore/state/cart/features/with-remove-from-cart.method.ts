import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import {
	cartProductsEntityConfig,
	CartProductEntityState,
} from '../cart.store';

export const withRemoveFromCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductEntityState>() },
		withMethods((store) => {
			return {
				removeFromCart: (product: CartProduct) =>
					patchState(
						store,
						removeEntity(
							product.variant.id,
							cartProductsEntityConfig,
						),
					),
			};
		}),
	);
