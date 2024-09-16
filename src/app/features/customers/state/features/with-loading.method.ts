import {
	patchState,
	signalStoreFeature,
	withState,
	withMethods,
} from '@ngrx/signals';

export function withLoading() {
	return signalStoreFeature(
		withState({ isLoading: false }),
		withMethods((store) => {
			return {
				setLoading: (isLoading: boolean): void =>
					patchState(store, { isLoading }),
				setTest: () => console.log('testing'),
			};
		}),
	);
}
