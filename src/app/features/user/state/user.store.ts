import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withLoading } from '@src/app/features/base/state/with-loading.method';
import { storeType } from '@src/app/view/state/utils/utils';
import { withCheckPhoneMethod } from './features/with-check-phone.method';
import { withLoginMethod } from './features/with-login.method';
import { withRegisterMethod } from './features/with-register.method';

export type UserStoreState = {
	user: User;
	isLoggedIn: boolean;
	registerationStep:
		| 'check-phone'
		| 'verify-otp'
		| 'register'
		| 'login'
		| 'done';
	apiMsg: string;
	apiMsgConfirmed: boolean;
};

const initialState: UserStoreState = {
	user: {
		name: '',
		countryCode: '002',
		phone: '',
		companyId: 0,
		password: '',
	},
	isLoggedIn: false,
	registerationStep: 'check-phone',
	apiMsg: '',
	apiMsgConfirmed: true,
};

export const userStore = signalStore(
	{ providedIn: 'root' },
	withLoading(),
	withState(initialState),
	withCheckPhoneMethod(),
	withLoginMethod(),
	withRegisterMethod(),
	withMethods((store) => {
		return {
			confirmApiMsg: () => patchState(store, { apiMsgConfirmed: true }),
		};
	}),
);

let _i = storeType(userStore);
export type UserStore = typeof _i;
