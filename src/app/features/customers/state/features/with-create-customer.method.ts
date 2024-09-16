import { inject } from '@angular/core';
import { CreateCustomerUseCase } from '@features';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export function withCreateCustomerMethod() {
	return signalStoreFeature(
		withMethods((store) => {
			let _create = inject(CreateCustomerUseCase);

			return {
				create: rxMethod<CustomerEntity>(
					pipe(
						tap(() => patchState(store, { isLoading: true })),
						switchMap((c) =>
							_create.execute(c).pipe(
								tapResponse({
									next: (c) => {},
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
