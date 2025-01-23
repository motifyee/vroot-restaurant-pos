import {
	patchState,
	signalStore,
	signalStoreFeature,
	type,
	withMethods,
	withState,
} from '@ngrx/signals';
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
import { withDeleteActiveInvoice } from './features/with-delete-active-invoice.method';
import { withExecuteActiveInvoice } from './features/with-execute-active-invoice.method';
import { withLoading } from '@src/app/features/base/state/with-loading.method';
import { withUpdateActiveInvoice } from './features/with-update-active-invoice.method';
import { withApiMsg } from '@src/app/features/base/state/with-api-msg.method';

export type InvoiceEntityState = NamedEntityState<GetInvoice, 'invoice'>;

export type InvoiceEntityProps = NamedEntityProps<GetInvoice, 'invoice'>;

export const invoiceEntityConfig = entityConfig({
	entity: type<GetInvoice>(),
	collection: 'invoice',
	selectId: (c: GetInvoice) => c.id!,
});

// #############################################################################

export type InvoiceStoreState = {
	_anonymousInvoiceId: number | null;
	selectedAddress: Address | null;
};

const initialState: InvoiceStoreState = {
	_anonymousInvoiceId: null,
	selectedAddress: null,
};

// TODO: add get favorite invoices method
export const invoiceStore = signalStore(
	(<_>() =>
		signalStoreFeature(
			withApiMsg(),
			withLoading(),
			withState(initialState),
			withEntities(invoiceEntityConfig),
			withMethods((store) => ({
				setSelectedAddress: (address: Address | null) => {
					patchState(store, { selectedAddress: address });
				},
			})),
		))(),

	// ##################################

	withGetInvoiceByIdMethod(),
	withGetInvoicesMethod(),
	withActiveInvoiceMethods(),

	withCreateInvoiceMethod(),
	withDeleteInvoiceMethod(),
	withUpdateInvoiceMethod(),

	// #################################

	withExecuteActiveInvoice(),
	withUpdateActiveInvoice(),

	withAddProduct(),
	withRemoveProductAtIndex(),
	withIncrementProductAtIndex(),
	withDecrementProductAtIndex(),
	withDeleteActiveInvoice(),
);

// #############################################################################

let _i = storeType(invoiceStore);
export type InvoiceStore = typeof _i;
