import { inject } from '@angular/core';
import {
	Customer,
	customerConfig,
	GetCustomerUseCase,
} from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	type,
	patchState,
	signalStoreFeature,
	withMethods,
} from '@ngrx/signals';
import { addEntity, NamedEntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withGetCustomerByIdMethod<_>() {
	return signalStoreFeature(
		{
			state: type<NamedEntityState<Customer, 'customers'>>(),
			methods: type<LoadingMethod>(),
		},
		withMethods((store) => {
			let usecase = inject(GetCustomerUseCase);

			return {
				getCustomer: rxMethod<{ customerId: string }>(
					pipe(
						distinctUntilChanged(),
						tap(() => store.setLoading(true)),
						switchMap((p) =>
							usecase.execute(p).pipe(
								tapResponse({
									next: (c) =>
										patchState(
											store,
											addEntity(c, customerConfig),
										),
									error: console.error,
									finalize: () => store.setLoading(false),
								}),
							),
						),
					),
				),
			};
		}),
	);
}
