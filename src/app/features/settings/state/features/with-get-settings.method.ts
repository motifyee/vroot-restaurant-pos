import { inject } from '@angular/core';
import { GetBranchSettingsUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export function withGetSettingsMethod<_>() {
	return signalStoreFeature(
		{ state: type<{ isLoading: boolean } & BranchSettings>() },
		withMethods((store) => {
			let _get = inject(GetBranchSettingsUseCase);

			return {
				loadSettings: rxMethod(
					pipe(
						tap(() => patchState(store, { isLoading: true })),
						switchMap((p) =>
							_get.execute().pipe(
								tapResponse({
									next: (s) => patchState(store, s),
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
