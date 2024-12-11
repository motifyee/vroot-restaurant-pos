import {
	patchState,
	signalStoreFeature,
	withMethods,
	withState,
} from '@ngrx/signals';

type State = {
	orderType: null | 'pickup' | 'delivery';
};

const initialState: State = {
	orderType: null,
};

export function withSelectOrderTypeMethod<_>() {
	return signalStoreFeature(
		withState(initialState),
		withMethods((store) => {
			return {
				selectOrderType: (orderType: 'pickup' | 'delivery') => {
					patchState(store, { orderType });
				},
			};
		}),
	);
}
