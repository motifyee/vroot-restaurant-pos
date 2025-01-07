import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntities, addEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo, InvoicesFilter } from '@webstore/features';
import {
	invoiceEntityConfig,
	InvoiceEntityState,
	InvoiceStoreState,
} from '../invoice.store';
import { userStore } from '@webstore/state/user';
import { GetInvoiceByIdMethodType } from './with-get-invoice-by-id.method';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withGetInvoicesMethod<_>() {
	return signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			methods: type<GetInvoiceByIdMethodType & LoadingMethod>(),
		},
		withMethods((store) => {
			const repo = inject(CartRepo);
			const user = inject(userStore);

			return {
				getInvoices: (params: InvoicesFilter) => {
					store.setLoading(true);

					// If user is logged in, get all active invoices
					if (user.isLoggedIn()) {
						return repo.getInvoices(params).subscribe({
							next: (invs) => {
								store.setLoading(false);
								patchState(
									store,
									addEntities(invs, invoiceEntityConfig),
								);
							},
							error: (err) => {
								store.setLoading(false);
								console.error(err);
							},
						});
					}

					// If not logged in, try to load anonymous invoice
					const anonymousId = store._anonymousInvoiceId();
					if (!anonymousId) {
						store.setLoading(false);
						return;
					}

					// Load the anonymous invoice and set it as active
					return store
						.getInvoiceById({ id: +anonymousId })
						.subscribe({
							next: (inv) => {
								store.setLoading(false);
								patchState(
									store,
									addEntity(inv, invoiceEntityConfig),
								);
							},
							error: (err) => {
								store.setLoading(false);
								console.error('Failed to load invoice:', err);
							},
						});
				},
			};
		}),
	);
}
