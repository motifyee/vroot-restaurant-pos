import { inject } from '@angular/core';
import { UpdateCustomerUseCase, Customer } from '@features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	type,
	signalStoreFeature,
	withMethods,
} from '@ngrx/signals';
import { EntityState, setEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

export function withUpdateCustomerMethod() {
	return signalStoreFeature(
		{
			state: type<EntityState<Customer>>(),
			methods: type<{ setLoading(isLoading: boolean): void }>(),
		},

		withMethods((store) => {
			let usecase = inject(UpdateCustomerUseCase);

			return {
				update: rxMethod<CustomerEntity>(
					pipe(
						distinctUntilChanged(),
						tap(() => store.setLoading(true)),
						switchMap((p) =>
							usecase.execute(p).pipe(
								tapResponse({
									next: (c) =>
										patchState(store, setEntity(c)),
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
