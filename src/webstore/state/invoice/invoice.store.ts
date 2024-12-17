import { signalStore, type, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import {
	entityConfig,
	NamedEntityComputed,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withCreateInvoiceMethod } from './features/with-create-invoice.method';
import { withDeleteInvoiceMethod } from './features/with-delete-invoice.method';
import { withGetInvoiceByIdMethod } from './features/with-get-invoice-by-id.method';
import { withGetInvoicesMethod } from './features/with-get-invoices.method';
import { withUpdateInvoiceMethod } from './features/with-update-invoice.method';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';

export type InvoiceEntityState = NamedEntityState<Invoice, 'invoice'>;

export type InvoiceEntityComputed = NamedEntityComputed<Invoice, 'invoice'>;

export const invoiceEntityConfig = entityConfig({
	entity: type<Invoice>(),
	collection: 'invoice',
});

// #############################################################################

export type InvoiceStoreState = {};

const initialState: InvoiceStoreState = {};

// #############################################################################

export const invoiceStore = signalStore(
	withState(initialState),
	withEntities(invoiceEntityConfig),

	withCreateInvoiceMethod(),
	withDeleteInvoiceMethod(),
	withGetInvoiceByIdMethod(),
	withGetInvoicesMethod(),
	withUpdateInvoiceMethod(),
);

// #############################################################################

let _i = storeType(invoiceStore);
export type InvoiceStore = typeof _i;
