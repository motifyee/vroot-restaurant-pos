import { inject } from '@angular/core';
import { CreateCustomerUseCase, Customer } from '@src/app/features';
import { tapResponse } from '@ngrx/operators';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { NamedEntityState } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type StateType = NamedEntityState<Customer, 'customers'>; // & {
// 	isLoading: boolean;
// };
export function withCreateCustomerMethod<_>() {
	return signalStoreFeature(
		{
			state: type<StateType>(),
			id: type<CustomerDTO>(),
		},
		withMethods((store) => {
			let _create = inject(CreateCustomerUseCase);

			return {
				create: rxMethod<Partial<CustomerDTO>>(
					pipe(
						// tap(() => patchState(store, { isLoading: true })),
						switchMap((c) =>
							_create.execute(c).pipe(
								tapResponse({
									next: (c) => {},
									error: console.error,
									finalize: () => {},
									// patchState(store, { isLoading: false }),
								}),
							),
						),
					),
				),
			};
		}),
	);
}
