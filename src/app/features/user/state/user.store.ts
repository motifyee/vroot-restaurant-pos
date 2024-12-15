import {
	patchState,
	signalStore,
	type,
	withMethods,
	withState,
} from '@ngrx/signals';
import { withLoading } from '@src/app/features/base/state/with-loading.method';
import { storeType } from '@src/app/view/state/utils/utils';
import { withCheckPhoneMethod } from './features/with-check-phone.method';
import { withLoginMethod } from './features/with-login.method';
import { withRegisterMethod } from './features/with-register.method';
import { withUserDataMethods } from './features/with-user-data.methods';
import {
	addEntities,
	entityConfig,
	NamedEntityComputed,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withCreateAddressMethod } from './features/with-create-address.method';
import { withUpdateAddressMethod } from './features/with-update-address.method';
import { withDeleteAddressMethod } from './features/with-delete-address.method';
import { withGetAddressesMethod } from './features/with-get-addresses.method';
import { withSetDefaultAddressMethod } from './features/with-set-default-address.method';

export type UserAddressesEntityState = NamedEntityState<
	Address,
	'userAddresses'
>;
export type UserAddressesEntityComputed = NamedEntityComputed<
	Address,
	'userAddresses'
>;

export const userAddressesEntityConfig = entityConfig({
	entity: type<Address>(),
	collection: 'userAddresses',
});

// #############################################################################

type RegistrationStep =
	| 'check-phone'
	| 'verify-otp'
	| 'register'
	| 'login'
	| 'done';

export const defaultUserState = {
	name: '',
	countryCode: '002',
	phone: '',
	companyId: 0,
	password: '',
};

export type UserStoreState = {
	user: User;

	isLoggedIn: boolean;
	registerationStep: RegistrationStep;

	apiMsg: string;
	apiMsgConfirmed: boolean;
};

const initialState: UserStoreState = {
	user: defaultUserState,

	isLoggedIn: false,
	registerationStep: 'check-phone',

	apiMsg: '',
	apiMsgConfirmed: true,
};

// #############################################################################

export const userStore = signalStore(
	{ providedIn: 'root' },
	withLoading(),
	withState(initialState),
	withEntities(userAddressesEntityConfig),

	withUserDataMethods(),
	//  auth methods
	withCheckPhoneMethod(),
	withLoginMethod(),
	withRegisterMethod(),
	// addresses methods
	withCreateAddressMethod(),
	withUpdateAddressMethod(),
	withDeleteAddressMethod(),
	withGetAddressesMethod(),
	withSetDefaultAddressMethod(),
	withMethods((store) => {
		return {
			confirmApiMsg: () => patchState(store, { apiMsgConfirmed: true }),
			setRegistrationStep: (registerationStep: RegistrationStep) =>
				patchState(store, { registerationStep }),
			addDumbyAddresses: () => {
				patchState(
					store,
					addEntities(
						[
							{
								address: 'Cairo, Egypt',
								id: 1,
								isDefault: true,
							},
							{
								address: 'Alexandria, Egypt',
								id: 2,
								isDefault: false,
							},
							{
								address: 'Giza, Egypt',
								id: 3,
								isDefault: false,
							},
						] as Address[],
						userAddressesEntityConfig,
					),
				);
			},
		};
	}),
);

let _i = storeType(userStore);
export type UserStore = typeof _i;
