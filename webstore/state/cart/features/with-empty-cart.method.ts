import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { CartStoreState } from '../cart.store';

export const withEmptyCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartStoreState>() },
		withMethods((store) => {
			return {
				emptyCart: () => patchState(store, { products: [] }),
			};
		}),
	);
