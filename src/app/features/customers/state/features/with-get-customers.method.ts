import { inject } from '@angular/core';
import { GetCustomersUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { addEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export function withGetCustomersMethod<_>() {
	return signalStoreFeature(
		withMethods((store) => {
			let _getAll = inject(GetCustomersUseCase);

			return {
				loadCustomers: rxMethod<{
					pageNumber: number;
					pageSize: number;
				}>(
					pipe(
						distinctUntilChanged(),
						tap(() => patchState(store, { isLoading: true })),
						switchMap((p) =>
							_getAll.execute(p).pipe(
								tapResponse({
									next: (cs) =>
										patchState(store, addEntities(cs)),
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
