import { inject } from '@angular/core';
import { LoginParams, UserRepo, UserStoreState } from '@src/app/features';
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

export function withLoginMethod<_>() {
	return signalStoreFeature(
		{ state: type<UserStoreState & LoadingState>() },
		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				login: rxMethod<LoginParams>(
					pipe(
						tap(() => patchState(store, { isLoading: true })),
						switchMap((params) =>
							userRepo.login(params).pipe(
								tapResponse({
									next: (response) => {
										patchState(store, {
											user: {
												...params,
												...response,
											},
											isLoggedIn: true,
											isLoading: false,
											registerationStep: 'done',
										});
									},
									error: (error) =>
										patchState(store, {
											isLoading: false,
											apiMsg: (<any>error).error.message,
											apiMsgConfirmed: false,
											//
											// isLoggedIn: true,
											// registerationStep: 'done',
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
