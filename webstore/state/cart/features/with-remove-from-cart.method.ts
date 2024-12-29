import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { CartStoreState } from '../cart.store';

export const withRemoveFromCartMethod = <_>() =>
	signalStoreFeature(
		{ state: type<CartStoreState>() },
		withMethods((store) => {
			return {
				removeIdxFromCart: (productIdx: number) =>
					patchState(store, {
						products: store
							.products()
							.filter((_, idx) => idx !== productIdx),
					}),
			};
		}),
	);
