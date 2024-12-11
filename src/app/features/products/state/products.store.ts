import { signalStore, type, withComputed, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import { withCategoriesMethod } from './features/with-categories.method';
import {
	entityConfig,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withAddToCartMethod } from './features/with-add-to-cart.method';
import { withRemoveFromCartMethod } from './features/with-remove-from-cart.method';
import { withUpdateCartMethod } from './features/with-update-cart-cart.method';
import { computed } from '@angular/core';
import { withEmptyCartMethod } from './features/with-empty-cart.method';

export type CartProductsConfig = NamedEntityState<CartProduct, 'cartProducts'>;

export const cartProductsConfig = entityConfig({
	entity: type<CartProduct>(),
	collection: 'cartProducts',
	selectId: (c: CartProduct) => c.variant.id,
});

// #############################################################################

export type ProductStoreState = {};

const initialState: ProductStoreState = {};

// #############################################################################

export const productStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withEntities(cartProductsConfig),
	withCategoriesMethod(),

	withComputed((store) => {
		return {
			cartTotal: computed(() =>
				store
					.cartProductsEntities()
					.reduce((a, b) => a + b.variant.price * b.quantity, 0),
			),
		};
	}),

	withAddToCartMethod(),
	withRemoveFromCartMethod(),
	withUpdateCartMethod(),
	withEmptyCartMethod(),
);

// #############################################################################

let _i = storeType(productStore);
export type ProductIndexStore = typeof _i;
