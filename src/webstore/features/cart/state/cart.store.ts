import { signalStore, type, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withMenuMethods } from './features/menu-methods/with-menu.methods';
import {
	entityConfig,
	NamedEntityComputed,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withAddToCartMethod } from './features/cart-methods/with-add-to-cart.method';
import { withRemoveFromCartMethod } from './features/cart-methods/with-remove-from-cart.method';
import { withUpdateCartMethod } from './features/cart-methods/with-update-cart-cart.method';
import { withEmptyCartMethod } from './features/cart-methods/with-empty-cart.method';
import { withCartTotalComputed } from './features/cart-methods/with-cart-total.computed';

export type CartProductsState = NamedEntityState<CartProduct, 'cartProducts'>;

export type CartProductsEntityComputed = NamedEntityComputed<
	CartProduct,
	'cartProducts'
>;

export const cartProductsConfig = entityConfig({
	entity: type<CartProduct>(),
	collection: 'cartProducts',
	selectId: (c: CartProduct) => c.variant.id,
});

// #############################################################################

export type CartStoreState = {};

const initialState: CartStoreState = {};

// #############################################################################

export const cartStore = signalStore(
	withState(initialState),
	withEntities(cartProductsConfig),

	withCartTotalComputed(),

	withMenuMethods(),

	withAddToCartMethod(),
	withRemoveFromCartMethod(),
	withUpdateCartMethod(),
	withEmptyCartMethod(),
);

// #############################################################################

let _i = storeType(cartStore);
export type ProductIndexStore = typeof _i;
