import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CartProductEntityProps } from '../cart.store';
import { computed } from '@angular/core';

export const withCartTotalComputed = <_>() =>
	signalStoreFeature(
		{ props: type<CartProductEntityProps>() },

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
