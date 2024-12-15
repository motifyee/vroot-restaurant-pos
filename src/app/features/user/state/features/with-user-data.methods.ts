import { defaultUserState, UserStoreState } from '@src/app/features';
import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { featureType } from '@src/app/view/state/utils/utils';

export function withUserDataMethods<_>() {
	return signalStoreFeature(
		{ state: type<UserStoreState>() },
		withMethods((store) => {
			return {
				loadUserData: () => {
					let data = localStorage.getItem('user');

					if (data) {
						let user: User = JSON.parse(data);
						patchState(store, { user, isLoggedIn: true });
					}
				},
				storeUserData: (user: User) => {
					user.token && localStorage.setItem('token', user.token);
					delete user.password;

					let data = JSON.stringify(user);
					localStorage.setItem('user', data);
				},
				removeUserData: () => {
					localStorage.removeItem('user');
					patchState(store, {
						user: defaultUserState,
						isLoggedIn: false,
					});
				},
			};
		}),
	);
}

const _i = featureType(withUserDataMethods);
export type UserDataMethodsType = typeof _i.methods;
