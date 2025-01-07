import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { invoiceStore, userStore } from '@webstore/state';

export function checkoutPageGuard(): CanActivateFn {
	return () => {
		const invoices = inject(invoiceStore);
		const user = inject(userStore);
		const router = inject(Router);

		// TODO: check if user selected a branch & order type (delivery/pickup) & address
		const conditions = [
			!invoices.activeInvoice()?.products.length,
			!user.isLoggedIn(),
		];
		if (conditions.some((c) => c)) {
			router.navigate(['/']);
			return false;
		}

		return true;
	};
}
