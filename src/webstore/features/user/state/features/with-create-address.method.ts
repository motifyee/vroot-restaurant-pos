import { inject } from '@angular/core';
import {
	UpdateAddressParams,
	userAddressesEntityConfig,
	UserAddressesEntityState,
	UserRepo,
	UserStoreState,
} from '@webstore/features';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { addEntity } from '@ngrx/signals/entities';

export function withCreateAddressMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState & UserAddressesEntityState>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				createAddress: (params: Address) =>
					of(params).pipe(
						tap(() => store.setLoading(true)),

						switchMap((params) =>
							userRepo.createAddress(params).pipe(
								tap((address) => {
									store.setLoading(false);

									patchState(
										store,
										addEntity(
											address,
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
