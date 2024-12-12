import { inject } from '@angular/core';
import { RegisterParams, UserRepo, UserStoreState } from '@src/app/features';
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

export function withRegisterMethod<_>() {
	return signalStoreFeature(
		{ state: type<UserStoreState & LoadingState>() },
		withMethods((store) => {
			const userRepo = inject(UserRepo);

			return {
				register: rxMethod<RegisterParams>(
					pipe(
						tap(() => patchState(store, { isLoading: true })),
						switchMap((params) =>
							userRepo.register(params).pipe(
								tapResponse({
									next: (response) => {
										patchState(store, {
											user: {
												...params,
												...response,
											},
											registerationStep: 'done',
											isLoggedIn: true,
											isLoading: false,
										});
									},
									error: (error) =>
										patchState(store, {
											isLoading: false,
											apiMsg:
												(<any>error).error.message ||
												(<any>error).error.title ||
												'Something went wrong',
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
