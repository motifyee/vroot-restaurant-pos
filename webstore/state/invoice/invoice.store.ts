import { signalStore, type, withState } from '@ngrx/signals';
import { storeType } from '@src/app/view/state/utils/utils';
import {
	entityConfig,
	NamedEntityProps,
	NamedEntityState,
	withEntities,
} from '@ngrx/signals/entities';
import { withCreateInvoiceMethod } from './features/with-create-invoice.method';
import { withDeleteInvoiceMethod } from './features/with-delete-invoice.method';
import { withGetInvoiceByIdMethod } from './features/with-get-invoice-by-id.method';
import { withGetInvoicesMethod } from './features/with-get-invoices.method';
import { withUpdateInvoiceMethod } from './features/with-update-invoice.method';

export type InvoiceEntityState = NamedEntityState<WebstoreInvoice, 'invoice'>;

export type InvoiceEntityProps = NamedEntityProps<WebstoreInvoice, 'invoice'>;

export const invoiceEntityConfig = entityConfig({
	entity: type<WebstoreInvoice>(),
	collection: 'invoice',
	selectId: (c: WebstoreInvoice) => c.id!,
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
