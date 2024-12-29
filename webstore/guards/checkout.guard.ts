import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { cartStore, userStore } from '@webstore/state';

export function checkoutPageGuard(): CanActivateFn {
	return () => {
		const cart = inject(cartStore);
		const user = inject(userStore);
		const router = inject(Router);

		// TODO: check if user selected a branch & order type (delivery/pickup) & address
		const conditions = [cart.products().length === 0, !user.isLoggedIn()];
		if (conditions.some((c) => c)) {
			router.navigate(['/']);
			return false;
		}

		return true;
	};
}
