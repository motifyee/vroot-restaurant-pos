import { query } from '@angular/animations';
import { inject } from '@angular/core';
import { GetClassificationsUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	type,
	signalStoreFeature,
	withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withGetClassificationsMethod<_>() {
	return signalStoreFeature(
		{
			// state: type<{ classifications: Classification[] }>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			let usecase = inject(GetClassificationsUseCase);

			return {
				getClassifications: rxMethod<void>(
					pipe(
						tap(() => store.setLoading(true)),
						switchMap(() =>
							usecase.execute().pipe(
								tapResponse({
									next: (cs) =>
										patchState(store, {
											classifications: cs,
										}),
									error: console.error,
									finalize: () => store.setLoading(true),
								}),
							),
						),
					),
				),
			};
		}),
	);
}
