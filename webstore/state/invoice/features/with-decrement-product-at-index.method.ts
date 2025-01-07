import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { ActiveInvoiceFeaturePropsType } from './with-active-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { RemoveProductAtIndexMethodType } from './with-remove-product-at-index.method';

export const withDecrementProductAtIndex = <_>() =>
	signalStoreFeature(
		{
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				UpdateInvoiceMethodType & RemoveProductAtIndexMethodType
			>(),
		},
		withMethods((store) => {
			return {
				decrementProductAtIndex: (
					index: number,
					quantity: number = 1,
				) => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}

					// Get the product at the specified index
					const product = activeInvoice.products[index];
					if (!product) {
						console.error('Product not found at index:', index);
						return;
					}

					// Calculate new quantity
					const newQuantity = product.quantity - quantity;

					// If quantity would become 0 or less, remove the product
					if (newQuantity <= 0) {
						return store.removeProductAtIndex(index);
					}

					// Create a new array with the decremented product quantity
					const products = activeInvoice.products.map(
						(product, idx) => {
							if (idx === index) {
								return {
									...product,
									quantity: newQuantity,
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

let _i = featureType(withDecrementProductAtIndex);
export type DecrementProductAtIndexMethodType = typeof _i.methods;
