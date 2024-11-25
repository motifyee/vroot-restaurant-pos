import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';

interface ProductsState {
	categoriesViewHasInit: boolean;
	selectedProduct: Product | undefined;
}

const intialState: ProductsState = {
	categoriesViewHasInit: false,
	selectedProduct: undefined,
};

export const productsPageStore = signalStore(
	withState(intialState),
	withMethods((store) => {
		return {
			setCategoriesViewInit: () =>
				patchState(store, { categoriesViewHasInit: true }),
			selectProduct: (p?: Product) =>
				patchState(store, { selectedProduct: p }),
		};
	}),
);

let _s = storeType(productsPageStore);
export type ProductsStore = typeof _s;
