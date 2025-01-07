import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import {
	ActiveInvoiceFeaturePropsType,
	ActiveInvoiceFeatureMethodsType,
} from './with-active-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';

export const withIncrementProductAtIndex = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				UpdateInvoiceMethodType & ActiveInvoiceFeatureMethodsType
			>(),
		},
		withMethods((store) => {
			return {
				incrementProductAtIndex: (
					index: number,
					quantity: number = 1,
				) => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}

					// Create a new array with the incremented product quantity
					const products = activeInvoice.products.map(
						(product, idx) => {
							if (idx === index) {
								return {
									...product,
									quantity: product.quantity + quantity,
								};
							}
							return product;
						},
					);

					// Update invoice with modified products
					const invoice: GetInvoice = {
						...activeInvoice,
						products,
					};

					return store.updateInvoice(invoice).subscribe();
				},
			};
		}),
	);

let _i = featureType(withIncrementProductAtIndex);
export type IncrementProductAtIndexMethodType = typeof _i.methods;
