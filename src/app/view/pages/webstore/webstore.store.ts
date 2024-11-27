import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';

interface ProductsState {
	categoriesViewHasInit: boolean;
	selectedProduct: ProductVariant | undefined;
}

const intialState: ProductsState = {
	categoriesViewHasInit: false,
	selectedProduct: undefined,
};

export const webstorePageStore = signalStore(
	withState(intialState),
	withMethods((store) => {
		return {
			setCategoriesViewInit: () =>
				patchState(store, { categoriesViewHasInit: true }),
			selectProduct: (v?: ProductVariant, p?: Product) =>
				patchState(store, {
					selectedProduct: v ? { ...v, product: p } : v,
				}),
		};
	}),
);

let _s = storeType(webstorePageStore);
export type ProductsStore = typeof _s;
