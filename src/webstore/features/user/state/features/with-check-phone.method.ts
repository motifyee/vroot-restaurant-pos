import { inject } from '@angular/core';
import { UserRepo, UserStoreState } from '@webstore/features';
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

export function withCheckPhoneMethod<_>() {
	return signalStoreFeature(
		{ state: type<UserStoreState>(), methods: type<LoadingMethod>() },
		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				checkPhone: rxMethod<{
					phone: string;
					countryCode: string;
					companyId: number;
				}>(
					pipe(
						tap((params) => {
							store.setLoading(true);

							patchState(store, {
								user: { ...store.user(), ...params },
							});
						}),
						switchMap((params) =>
							userRepo.checkPhone(params).pipe(
								tapResponse({
									next: (isRegistered) => {
										store.setLoading(false);

										patchState(store, {
											registerationStep: isRegistered
												? 'login'
												: 'register',
										});
									},
									error: () => {
										store.setLoading(false);

										patchState(store, {
											apiMsg: 'Something went wrong',
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
