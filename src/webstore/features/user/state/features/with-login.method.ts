import { inject } from '@angular/core';
import { LoginParams, UserRepo, UserStoreState } from '@webstore/features';
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

export function withLoginMethod<_>() {
	return signalStoreFeature(
		{
			state: type<UserStoreState>(),
			methods: type<LoadingMethod & UserDataMethodsType>(),
		},
		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				login: rxMethod<LoginParams>(
					pipe(
						tap(() => store.setLoading(true)),
						switchMap((params) =>
							userRepo.login(params).pipe(
								tapResponse({
									next: (response) => {
										const user = { ...params, ...response };
										store.storeUserData(user);
										store.setLoading(false);

										patchState(store, {
											user,
											isLoggedIn: true,
											registerationStep: 'done',
										});
									},
									error: (error) => {
										store.setLoading(false);

										patchState(store, {
											apiMsg: (<any>error).error.message,
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
