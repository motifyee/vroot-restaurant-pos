import { inject } from '@angular/core';
import { Customer, GetCustomerUseCase } from '@features';
import { tapResponse } from '@ngrx/operators';
import {
	type,
	patchState,
	signalStoreFeature,
	withMethods,
} from '@ngrx/signals';
import { addEntity, EntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export function withGetCustomerByIdMethod() {
	return signalStoreFeature(
		{
			state: type<EntityState<Customer>>(),
			methods: type<{ setLoading(isLoading: boolean): void }>(),
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
										patchState(store, addEntity(c)),
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
