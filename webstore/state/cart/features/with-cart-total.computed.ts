import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { CartStoreState } from '../cart.store';
import { computed, inject } from '@angular/core';
import { CalcCartTotalPriceUseCase } from '@webstore/features';

export const withCartTotalComputed = <_>() =>
	signalStoreFeature(
		{ state: type<CartStoreState>() },

		withComputed((store) => {
			const cartTotal = inject(CalcCartTotalPriceUseCase);

			return {
				cartTotal: computed(() => {
					const products = store.products();
					return cartTotal.execute({ products });
				}),
			};
		}),
	);
