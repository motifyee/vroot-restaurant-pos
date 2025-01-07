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
import { withActiveInvoice as withActiveInvoiceMethods } from './features/with-active-invoice.method';
import { withAddProduct } from './features/with-add-product.method';
import { withRemoveProductAtIndex } from './features/with-remove-product-at-index.method';
import { withIncrementProductAtIndex } from './features/with-increment-product-at-index.method';
import { withDecrementProductAtIndex } from './features/with-decrement-product-at-index.method';
import { withRemoveActiveInvoice } from './features/with-remove-active-invoice.method';

export type InvoiceEntityState = NamedEntityState<GetInvoice, 'invoice'>;

export type InvoiceEntityProps = NamedEntityProps<GetInvoice, 'invoice'>;

export const invoiceEntityConfig = entityConfig({
	entity: type<GetInvoice>(),
	collection: 'invoice',
	selectId: (c: GetInvoice) => c.id!,
});

// #############################################################################

export type InvoiceStoreState = {
	_anonymousInvoiceId: number;
};

const initialState: InvoiceStoreState = {
	_anonymousInvoiceId: -1,
};

// TODO: add get favorite invoices method
export const invoiceStore = signalStore(
	withState(initialState),
	withEntities(invoiceEntityConfig),

	// ##################################

	withGetInvoiceByIdMethod(),
	withGetInvoicesMethod(),

	withCreateInvoiceMethod(),
	withDeleteInvoiceMethod(),
	withUpdateInvoiceMethod(),

	// #################################

	withActiveInvoiceMethods(),

	withAddProduct(),
	withRemoveProductAtIndex(),
	withIncrementProductAtIndex(),
	withDecrementProductAtIndex(),
	withRemoveActiveInvoice(),
);

// #############################################################################

let _i = storeType(invoiceStore);
export type InvoiceStore = typeof _i;
