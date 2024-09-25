import {
	patchState,
	signalStoreFeature,
	withState,
	withMethods,
} from '@ngrx/signals';

export type LoadingState = { isLoading: boolean };

export type LoadingMethod = { setLoading(isLoading: boolean): void };

const initialState: LoadingState = {
	isLoading: false,
};

export function withLoading() {
	return signalStoreFeature(
		withState(initialState),
		withMethods((store) => {
			return {
				setLoading: (isLoading: boolean): void =>
					patchState(store, { isLoading }),
				setTest: () => console.log('testing'),
			};
		}),
	);
}
