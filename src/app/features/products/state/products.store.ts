import { signalStore, withMethods, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withGetCategoriesMethod } from './features/with-get-categories.method';

export type ProductStoreState = {
	categories: Category[];
};

const initialState: ProductStoreState = {
	categories: [],
};

export const productStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withGetCategoriesMethod(),
);

let _i = storeType(productStore);
export type ProductIndexStore = typeof _i;
