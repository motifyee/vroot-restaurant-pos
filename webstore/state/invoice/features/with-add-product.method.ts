import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import { ActiveInvoiceFeaturePropsType } from './with-active-invoice.method';
import { CreateInvoiceMethodType } from './with-create-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { inject } from '@angular/core';
import { settingsStore } from '@webstore/state/settings';
import { FindMatchingProductIndexUseCase } from '@webstore/features';
import { featureType } from '@src/app/view/state/utils/utils';
import { uuidv4 } from '@src/app/view/state/app/utils/uuid';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';

export const withAddProduct = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<CreateInvoiceMethodType & UpdateInvoiceMethodType>(),
		},
		withMethods((store) => {
			const settings = inject(settingsStore);
			const matchingProductIndex = inject(
				FindMatchingProductIndexUseCase,
			);

			return {
				addProduct: (product: InvoiceProduct) => {
					const activeInvoice = store.activeInvoice?.();

					// If no active invoice, create new one
					if (!activeInvoice) {
						const products = [product].map<CreateInvoiceProduct>(
							(p) => ({
								productVariantId: p.productVariantId,
								additions: p.additions,
								quantity: p.quantity,
								note: p.note,
							}),
						);
						const createInvoice: CreateInvoice = {
							products,
							salesInvoiceType: settings.defaultOrderType(),
							isUsualOrder: false,
							note: '',
							branchId: settings.selectedBranch?.()?.id || 0,
						};

						return store.createInvoice({
							invoice: createInvoice,
							creationToken: uuidv4(),
						});
					}

					const products = [...activeInvoice.products];

					const idx = matchingProductIndex.execute({
						product: product,
						list: products,
					});

					if (idx !== -1) {
						products[idx] = {
							...products[idx],
							quantity: products[idx].quantity + product.quantity,
						};
					} else {
						products.push(product);
					}

					const invoice: GetInvoice = {
						...store.activeInvoice()!,
						branchId: settings.selectedBranch?.()?.id || 0,
						products,
					};

					return store.updateInvoice(invoice);
				},
			};
		}),
	);

const _i = featureType(withAddProduct);
export type WithAddProductMethodType = typeof _i.methods;
