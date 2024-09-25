import { inject } from '@angular/core';
import { SearchCustomersUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { addEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export function withSearchCustomersMethod<_>() {
	return signalStoreFeature(
		withMethods((store) => {
			let _search = inject(SearchCustomersUseCase);

			return {
				search: rxMethod<{
					query: string;
					phone: string;
					pageNumber: number;
					pageSize: number;
				}>(
					pipe(
						distinctUntilChanged(),
						debounceTime(300),
						tap(() => patchState(store, { isLoading: true })),
						switchMap((p) =>
							_search.execute(p).pipe(
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
