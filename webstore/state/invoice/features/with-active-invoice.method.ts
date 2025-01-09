import { computed } from '@angular/core';
import {
	type,
	patchState,
	withMethods,
	withComputed,
	signalStoreFeature,
} from '@ngrx/signals';
import {
	InvoiceEntityProps,
	InvoiceEntityState,
	InvoiceStoreState,
} from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { GetInvoiceByIdMethodType } from './with-get-invoice-by-id.method';

export const withActiveInvoice = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<InvoiceEntityProps>(),
			methods: type<GetInvoiceByIdMethodType>(),
		},
		withMethods((store) => ({
			loadAnonymousInvoice: () => {
				const id = localStorage.getItem('anonymousInvoiceId');
				if (!id) return;

				store.getInvoiceById({ id: +id }).subscribe(() => {
					patchState(store, {
						_anonymousInvoiceId: +id,
					});
				});
			},

			setAnonymousInvoiceId: (id: number) => {
				localStorage.setItem('anonymousInvoiceId', id.toString());
				patchState(store, { _anonymousInvoiceId: id });
			},

			clearAnonymousInvoiceId: () => {
				localStorage.removeItem('anonymousInvoiceId');
				patchState(store, { _anonymousInvoiceId: -1 });
			},
		})),
		withComputed((store) => ({
			activeInvoiceId: computed<number | null>(() => {
				const id = store._anonymousInvoiceId();
				if (id !== -1) return id;

				const invoices = store
					.invoiceEntities()
					.filter((inv) => !inv.preparationStage);

				if (invoices.length === 0) return null;

				if (invoices.length > 1)
					console.error(
						'Found more than an active invoice',
						invoices,
					);

				return invoices[0].id;
			}),
		})),
		withComputed((store) => ({
			activeInvoice: computed<GetInvoice | null>(() => {
				const id = store.activeInvoiceId();
				if (!id) return null;

				return store.invoiceEntityMap()[id];
			}),
		})),
		withComputed((store) => ({
			activeUpdateInvoice: computed<UpdateInvoice | null>(() => {
				const invoice = store.activeInvoice();
				if (!invoice) return null;

				const products: CreateInvoiceProduct[] = invoice.products.map(
					(p) => {
						const additions: CreateAddition[] =
							p.additions?.map((a) => {
								const addition: CreateAddition = {
									id: a.id,
									with: a.with,
									quantity: a.quantity,
								};

								return addition;
							}) || [];

						const product: CreateInvoiceProduct = {
							productVariantId: p.productVariantId,
							quantity: p.quantity,
							additions,
							note: p.note,
						};

						return product;
					},
				);

				return {
					id: invoice.id,
					preparationStage: invoice.preparationStage,
					rating: invoice.rating,

					products,
					shippingAddressId: invoice.shippingAddressId,
					salesInvoiceType: invoice.salesInvoiceType,
					note: invoice.note,
					branchId: invoice.branchId,
					toBranchId: invoice.toBranchId,
					isUsualOrder: invoice.isUsualOrder,
				};
			}),
		})),
	);

let _i = featureType(withActiveInvoice);
export type ActiveInvoiceFeatureMethodsType = typeof _i.methods;
export type ActiveInvoiceFeaturePropsType = typeof _i.props;
