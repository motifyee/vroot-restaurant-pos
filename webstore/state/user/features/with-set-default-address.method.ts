import { computed, inject } from '@angular/core';
import {
	UserAddressesEntityProps,
	userAddressesEntityConfig,
	UserAddressesEntityState,
	UserStoreState,
} from '@webstore/state';
import {
	patchState,
	signalStoreFeature,
	type,
	withComputed,
	withMethods,
} from '@ngrx/signals';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { setEntity } from '@ngrx/signals/entities';
import { UserRepo } from '@webstore/features';

export function withSetDefaultAddressMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState & UserAddressesEntityState>(),
			props: type<UserAddressesEntityProps>(),
			methods: type<LoadingMethod>(),
		},

		withComputed((store) => {
			return {
				defaultAddress: computed(() =>
					store.userAddressesEntities().find((a) => a.isDefault),
				),
			};
		}),

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				setDefaultAddress: rxMethod<Address>(
					pipe(
						switchMap((address) => {
							if (address.isDefault) return '';
							store.setLoading(true);

							return userRepo
								.updateAddress({
									...address,
									isDefault: true,
								} as Address)
								.pipe(
									tapResponse({
										next: (_) => {
											const newDefaultUpdate = setEntity(
												{ ...address, isDefault: true },
												userAddressesEntityConfig,
											);

											const oldDefaultUpdate =
												!store.defaultAddress()
													? {}
													: setEntity(
															{
																...store.defaultAddress()!,
																isDefault:
																	false,
															},
															userAddressesEntityConfig,
														);

											store.setLoading(false);
											patchState(store, newDefaultUpdate);
											patchState(store, oldDefaultUpdate);
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
								);
						}),
					),
				),
			};
		}),
	);
}
