import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { setEntity } from '@ngrx/signals/entities';
import {
	cartProductsEntityConfig,
	CartProductEntityState,
} from '../cart.store';

export const withUpdateCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductEntityState>() },
		withMethods((store) => {
			return {
				updateCart: (product: CartProduct) =>
					patchState(
						store,
						setEntity(product, cartProductsEntityConfig),
					),
			};
		}),
	);
