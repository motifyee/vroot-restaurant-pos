import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';

interface ProductsPageState {
	//  `product-list.component` is responsible detecting this
	categoriesViewHasInit: boolean;
	selectedVariant: ProductVariant | undefined;
}

const intialState: ProductsPageState = {
	categoriesViewHasInit: false,
	selectedVariant: undefined,
};

export const productsPageStore = signalStore(
	withState(intialState),
	withMethods((store) => {
		return {
			setCategoriesViewInit: () =>
				patchState(store, { categoriesViewHasInit: true }),
			selectProduct: (selectedVariant?: ProductVariant) =>
				patchState(store, { selectedVariant }),
		};
	}),
);

let _s = storeType(productsPageStore);
export type ProductsStore = typeof _s;
