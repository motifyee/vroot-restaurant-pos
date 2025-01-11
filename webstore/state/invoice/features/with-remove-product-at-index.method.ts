import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import {
	ActiveInvoiceFeaturePropsType,
	ActiveInvoiceFeatureMethodsType,
} from './with-active-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { WithDeleteInvoiceMethodType } from './with-delete-invoice.method';

export const withRemoveProductAtIndex = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				UpdateInvoiceMethodType &
					WithDeleteInvoiceMethodType &
					ActiveInvoiceFeatureMethodsType
			>(),
		},
		withMethods((store) => {
			return {
				removeProductAtIndex: (index: number) => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}

					// Create a new array without the product at the specified index
					const products = activeInvoice.products.filter(
						(_, idx) => idx !== index,
					);

					// If no products left, delete the invoice
					if (products.length === 0) {
						return store
							.deleteInvoice({ id: activeInvoice.id })
							.subscribe(() => store.clearAnonymousInvoiceId());
					}

					// Update invoice with remaining products
					const invoice: GetInvoice = {
						...store.activeInvoice()!,
						products,
					};

					return store.updateInvoice(invoice).subscribe();
				},
			};
		}),
	);

let _i = featureType(withRemoveProductAtIndex);
export type RemoveProductAtIndexMethodType = typeof _i.methods;
