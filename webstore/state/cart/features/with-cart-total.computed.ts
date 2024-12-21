import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CartProductEntityComputed } from '../cart.store';
import { computed } from '@angular/core';

export const withCartTotalComputed = <_>() =>
	signalStoreFeature(
		{ computed: type<CartProductEntityComputed>() },

		withComputed((store) => {
			return {
				cartTotal: computed(() =>
					store
						.cartProductEntities()
						.reduce((a, b) => a + b.variant.price * b.quantity, 0),
				),
			};
		}),
	);
