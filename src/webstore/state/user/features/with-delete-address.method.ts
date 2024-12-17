import { inject } from '@angular/core';
import {
	UserAddressesEntityState,
	userAddressesEntityConfig,
	UserStoreState,
} from '@webstore/state';
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
import { removeEntity } from '@ngrx/signals/entities';
import { UserRepo } from '@webstore/features';

export function withDeleteAddressMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState & UserAddressesEntityState>(),
			methods: type<LoadingMethod>(),
		},

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				deleteAddress: rxMethod<Address>(
					pipe(
						tap(() => store.setLoading(true)),

						switchMap((params) =>
							userRepo
								.deleteAddress({
									userId: store.user().id!,
									id: params.id,
								})
								.pipe(
									tapResponse({
										next: () => {
											store.setLoading(false);

											patchState(
												store,
												removeEntity(
													params.id,
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
