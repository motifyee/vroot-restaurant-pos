import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntities } from '@ngrx/signals/entities';
import {
	cartProductsEntityConfig,
	CartProductEntityState,
} from '../cart.store';

export const withEmptyCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartProductEntityState>() },
		withMethods((store) => {
			return {
				emptyCart: () =>
					patchState(
						store,
						removeEntities(() => true, cartProductsEntityConfig),
					),
			};
		}),
	);
