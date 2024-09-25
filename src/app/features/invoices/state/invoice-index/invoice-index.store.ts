import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { Invoice } from '../../domain/models/Invoice.model';
import {
	addEntity,
	EntityId,
	removeEntity,
	updateEntity,
	withEntities,
} from '@ngrx/signals/entities';
import { InvoiceIndexFilter } from '../../domain';
import { withGetInvoicesMethod } from './features/with-get-invoices.method';
import { withGetInvoiceByIdMethod } from './features/with-get-invoice-by-id.method';
import { computed } from '@angular/core';
import { storeType } from '@src/app/view/stores/utils/utils';
import { withCreateInvoiceMethod } from './features/with-create-invoice.method';
import { withUpdateInvoiceMethod } from './features/with-update-invoice.method';
import { withDeleteInvoiceMethod } from './features/with-delete-invoice.method';

export type InvoiceStoreState = {
	filters: InvoiceIndexFilter;
};

const initialState: InvoiceStoreState = {
	filters: {
		pageNumber: 1,
		pageSize: 10,

		from: '',
		to: '',
	},
};

export const invoiceIndexStoreToken = signalStore(
	{ providedIn: 'root' },
	withEntities<Invoice>(),
	withState(initialState),

	withGetInvoicesMethod(),
	withGetInvoiceByIdMethod(),

	withCreateInvoiceMethod(),
	withUpdateInvoiceMethod(),
	withDeleteInvoiceMethod(),

	withMethods((store) => ({
		addInvoice: (inv: Invoice) => patchState(store, addEntity(inv)),
		deleteInvoice: (id: EntityId) => patchState(store, removeEntity(id)),
		updateInvoice: (inv: Invoice) =>
			patchState(store, updateEntity({ id: inv.id, changes: inv })),
	})),

	withComputed((store) => {
		return {
			filteredInvoices: computed(() =>
				store.entities().filter((inv) => {
					if (
						store.filters.toBranch &&
						inv.toBranchId !== store.filters.toBranch()
					)
						return false;

					// if ...

					return true;
				}),
			),
		};
	}),
	withComputed((store) => ({
		filteredInvoicesIds: computed(() =>
			store.filteredInvoices().map((inv) => inv.id),
		),
		filteredInvoicesMap: computed(() =>
			store
				.filteredInvoices()
				.reduce(
					(acc, inv) => ({ ...acc, [inv.id]: inv }),
					{} as { [key: number]: Invoice },
				),
		),
	})),
);

let _i = storeType(invoiceIndexStoreToken);
export type InvoiceIndexStore = typeof _i;
