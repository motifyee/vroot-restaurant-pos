import { inject } from '@angular/core';
import {
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
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { setAllEntities } from '@ngrx/signals/entities';

export function withGetAddressesMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState & UserAddressesEntityState>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				getAddresses: rxMethod<void>(
					pipe(
						tap(() => store.setLoading(true)),

						switchMap(() =>
							userRepo
								.getAddresses({ userId: store.user().id! })
								.pipe(
									tapResponse({
										next: (addresses) => {
											store.setLoading(false);

											patchState(
												store,
												setAllEntities(
													addresses,
													userAddressesEntityConfig,
												),
											);
										},
										error: (error) => {
											store.setLoading(false);

											patchState(store, {
												apiMsg: (<any>error).error
													.message,
												apiMsgConfirmed: false,
											});
										},
									}),
								),
						),
					),
				),
			};
		}),
	);
}
