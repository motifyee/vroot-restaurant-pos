import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CartProductsEntityComputed } from '../../cart.store';
import { computed } from '@angular/core';

export const withCartTotalComputed = <_>() =>
	signalStoreFeature(
		{ computed: type<CartProductsEntityComputed>() },

		withComputed((store) => {
			return {
				cartTotal: computed(() =>
					store
						.cartProductsEntities()
						.reduce((a, b) => a + b.variant.price * b.quantity, 0),
				),
			};
		}),
	);
