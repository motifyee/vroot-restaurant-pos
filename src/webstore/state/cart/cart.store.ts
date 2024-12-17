import { signalStore, type, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withMenuMethods } from '../menu/with-menu.methods';
import {
	entityConfig,
	NamedEntityComputed,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withAddToCartMethod } from './features/with-add-to-cart.method';
import { withRemoveFromCartMethod } from './features/with-remove-from-cart.method';
import { withUpdateCartMethod } from './features/with-update-cart-cart.method';
import { withEmptyCartMethod } from './features/with-empty-cart.method';
import { withCartTotalComputed } from './features/with-cart-total.computed';

export type CartProductEntityState = NamedEntityState<
	CartProduct,
	'cartProduct'
>;

export type CartProductEntityComputed = NamedEntityComputed<
	CartProduct,
	'cartProduct'
>;

export const cartProductsEntityConfig = entityConfig({
	entity: type<CartProduct>(),
	collection: 'cartProduct',
	selectId: (c: CartProduct) => c.variant.id,
});

// #############################################################################

export type CartStoreState = {};

const initialState: CartStoreState = {};

// #############################################################################

export const cartStore = signalStore(
	withState(initialState),
	withEntities(cartProductsEntityConfig),

	withCartTotalComputed(),

	// withMenuMethods(),

	withAddToCartMethod(),
	withRemoveFromCartMethod(),
	withUpdateCartMethod(),
	withEmptyCartMethod(),
);

// #############################################################################

let _i = storeType(cartStore);
export type CartStore = typeof _i;
