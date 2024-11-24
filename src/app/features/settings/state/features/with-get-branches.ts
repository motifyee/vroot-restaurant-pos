import { inject } from '@angular/core';
import { GetBranchesUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { LoadingState } from '@src/app/features/base/state/with-loading.method';

export function withGetBranchesMethod<_>() {
	return signalStoreFeature(
		{ state: type<LoadingState & { branches: Branch[] }>() },
		withMethods((store) => {
			let _get = inject(GetBranchesUseCase);

			return {
				getBranches: rxMethod(
					pipe(
						tap(() => patchState(store, { isLoading: true })),
						switchMap((p) =>
							_get.execute().pipe(
								tapResponse({
									next: (s) =>
										patchState(store, { branches: s }),
									error: console.error,
									finalize: () =>
										patchState(store, { isLoading: false }),
								}),
							),
						),
					),
				),
			};
		}),
	);
}
