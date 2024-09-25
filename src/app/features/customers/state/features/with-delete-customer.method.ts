import { inject } from '@angular/core';
import { DeleteCustomerUseCase } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import { type, signalStoreFeature, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withDeleteCustomerMethod<_>() {
	return signalStoreFeature(
		{ methods: type<LoadingMethod>() },

		withMethods((store) => {
			let usecase = inject(DeleteCustomerUseCase);

			return {
				delete: rxMethod<{
					customerId: string;
				}>(
					pipe(
						tap(() => store.setLoading(true)),
						switchMap((p) =>
							usecase.execute(p).pipe(
								tapResponse({
									next: (cs) => {},
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
