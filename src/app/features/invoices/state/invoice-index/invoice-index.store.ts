import {
	patchState,
	signalStore,
	withComputed,
	withMethods,
	withState,
} from '@ngrx/signals';
import { Invoice } from '../../domain/models/Invoice.model';
import { withEntities } from '@ngrx/signals/entities';
import { InvoiceIndexFilter } from '../../domain';
import { withGetInvoicesMethod } from './features/with-get-invoices.method';
import { withGetInvoiceByIdMethod } from './features/with-get-invoice-by-id.method';
import { computed } from '@angular/core';
import { storeType } from '@src/app/view/state/utils/utils';
import { withCreateInvoiceMethod } from './features/with-create-invoice.method';
import { withUpdateInvoiceMethod } from './features/with-update-invoice.method';
import { withDeleteInvoiceMethod } from './features/with-delete-invoice.method';

export type InvoiceStoreState = {
	selectedIds: number[];
	filters: InvoiceIndexFilter;
};

const initialState: InvoiceStoreState = {
	selectedIds: [],
	filters: {
		pageNumber: 1,
		pageSize: 10,

		from: '',
		to: '',
	},
};

export const invoiceIndexStore = signalStore(
	{ providedIn: 'root' },
	withEntities<Invoice>(),
	withState(initialState),
	withComputed((store) => {
		return {
			selectedInvoices: computed(() =>
				store.selectedIds().map((id) => store.entityMap()[id]),
			),
		};
	}),
	withMethods((store) => {
		return {
			selectIds: (ids: number[]) =>
				patchState(store, { selectedIds: ids }),
			selectInvoices: (invs: Invoice[]) =>
				patchState(store, { selectedIds: invs.map((inv) => inv.id) }),
		};
	}),

	withGetInvoicesMethod(),
	withGetInvoiceByIdMethod(),

	withCreateInvoiceMethod(),
	withUpdateInvoiceMethod(),
	withDeleteInvoiceMethod(),

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

let _i = storeType(invoiceIndexStore);
export type InvoiceIndexStore = typeof _i;
