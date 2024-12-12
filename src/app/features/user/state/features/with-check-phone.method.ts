import { inject } from '@angular/core';
import { UserRepo, UserStoreState } from '@src/app/features';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { LoadingState } from '@src/app/features/base/state/with-loading.method';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export function withCheckPhoneMethod<_>() {
	return signalStoreFeature(
		{ state: type<UserStoreState & LoadingState>() },
		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				checkPhone: rxMethod<{
					phone: string;
					countryCode: string;
					companyId: number;
				}>(
					pipe(
						tap((params) =>
							patchState(store, {
								isLoading: true,
								user: { ...store.user(), ...params },
							}),
						),
						switchMap((params) =>
							userRepo.checkPhone(params).pipe(
								tapResponse({
									next: (isRegistered) =>
										patchState(store, {
											isLoading: false,
											registerationStep: isRegistered
												? 'login'
												: 'register',
										}),
									error: () =>
										patchState(store, {
											isLoading: false,
											apiMsg: 'Something went wrong',
											apiMsgConfirmed: false,
											//
											// registerationStep: 'login',
										}),
								}),
							),
						),
					),
				),
			};
		}),
	);
}
