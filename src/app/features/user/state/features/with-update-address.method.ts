import { inject } from '@angular/core';
import {
	UpdateAddressParams,
	userAddressesEntityConfig,
	UserAddressesEntityState,
	UserRepo,
	UserStoreState,
} from '@src/app/features';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { updateEntity } from '@ngrx/signals/entities';

export function withUpdateAddressMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState & UserAddressesEntityState>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				updateAddress: (params: UpdateAddressParams) =>
					of(params).pipe(
						tap(() => store.setLoading(true)),

						switchMap((address) =>
							userRepo.updateAddress(address).pipe(
								tap(() => {
									store.setLoading(false);

									patchState(
										store,
										updateEntity(
											{
												id: address.id,
												changes: address,
											},
											userAddressesEntityConfig,
										),
									);
								}),

								catchError((error) => {
									store.setLoading(false);

									patchState(store, {
										apiMsg: (<any>error).error.message,
										apiMsgConfirmed: false,
									});

									return throwError(() => error);
								}),
							),
						),
					),
			};
		}),
	);
}
