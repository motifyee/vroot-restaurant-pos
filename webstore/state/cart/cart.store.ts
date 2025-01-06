import { signalStore, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withAddToCartMethod } from './features/with-add-to-cart.method';
import { withRemoveFromCartMethod } from './features/with-remove-from-cart.method';
import { withUpdateCartMethod } from './features/with-update-cart-cart.method';
import { withEmptyCartMethod } from './features/with-empty-cart.method';
import { withCartTotalComputed } from './features/with-cart-total.computed';
import { withGetProductIdxMethod } from './features/with-get-product-idx.method';
import { withIncrementIdxMethods } from './features/with-increment-idx.methods';

export type CartStoreState = {
	products: InvoiceProduct[];
};

const initialState: CartStoreState = {
	products: [],
};

// #############################################################################

export const cartStore = signalStore(
	withState(initialState),

	withCartTotalComputed(),

	withGetProductIdxMethod(),

	withIncrementIdxMethods(),
	withAddToCartMethod(),
	withRemoveFromCartMethod(),
	withUpdateCartMethod(),
	withEmptyCartMethod(),
);

// #############################################################################

let _i = storeType(cartStore);
export type CartStore = typeof _i;
