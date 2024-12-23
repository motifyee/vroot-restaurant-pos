import { inject } from '@angular/core';
import { UserStoreState } from '@webstore/state';
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
import { UserDataMethodsType } from './with-user-data.methods';
import { RegisterParams, UserRepo } from '@webstore/features';

export function withRegisterMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState>(),
			methods: type<UserDataMethodsType & LoadingMethod>(),
		},

		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				register: rxMethod<RegisterParams>(
					pipe(
						tap(() => store.setLoading(true)),
						switchMap((params) =>
							userRepo.register(params).pipe(
								tapResponse({
									next: (response) => {
										const user = { ...params, ...response };
										store.storeUserData(user);
										store.setLoading(false);

										patchState(store, {
											user: {
												...params,
												...response,
											},
											registerationStep: 'done',
											isLoggedIn: true,
										});
									},
									error: (error) => {
										store.setLoading(false);

										patchState(store, {
											apiMsg:
												(<any>error).error.message ||
												(<any>error).error.title ||
												'Something went wrong',
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
