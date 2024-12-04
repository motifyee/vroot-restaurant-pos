import { signalStore, withState } from '@ngrx/signals';
import { withLoading } from '@src/app/features/base/state/with-loading.method';
import { storeType } from '@src/app/view/state/utils/utils';

export type UserStoreState = {};

const initialState: UserStoreState = {};

export const userStore = signalStore(
	{ providedIn: 'root' },
	withLoading(),
	withState(initialState),
);

let _i = storeType(userStore);
export type UserStore = typeof _i;
