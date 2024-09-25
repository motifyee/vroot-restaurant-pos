import { inject } from '@angular/core';
import {
	UpdateCustomerUseCase,
	Customer,
	customerConfig,
} from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	type,
	signalStoreFeature,
	withMethods,
} from '@ngrx/signals';
import {
	EntityState,
	NamedEntityState,
	setEntity,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withUpdateCustomerMethod<_>() {
	return signalStoreFeature(
		{
			state: type<NamedEntityState<Customer, 'customers'>>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			let usecase = inject(UpdateCustomerUseCase);

			return {
				update: rxMethod<CustomerDTO>(
					pipe(
						distinctUntilChanged(),
						tap(() => store.setLoading(true)),
						switchMap((p) =>
							usecase.execute(p).pipe(
								tapResponse({
									next: (c) =>
										patchState(
											store,
											setEntity(c, customerConfig),
										),
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
