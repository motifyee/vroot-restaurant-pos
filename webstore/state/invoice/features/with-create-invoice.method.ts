import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { catchError, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { addEntity } from '@ngrx/signals/entities';
import { settingsStore } from '@webstore/state/settings';
import { featureType } from '@src/app/view/state/utils/utils';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			const repo = inject(CartRepo),
				settings = inject(settingsStore);

			return {
				createInvoice: (params: {
					invoice: CreateInvoice;
					creationToken: string;
				}) => {
					const invoice = {
						...params.invoice,
						toBranchId: settings.selectedBranch?.()?.id || 0,
					};

					return repo
						.createInvoice({
							...params,
							invoice,
						})
						.pipe(
							tap((inv) => {
								patchState(
									store,
									addEntity(inv, invoiceEntityConfig),
								);
							}),
							catchError((err) => {
								console.error(err);
								return throwError(() => err);
							}),
						);
				},
			};
		}),

		withMethods((store) => {
			return {
				createInvoiceFromCartProducts: (params: {
					products: CartVariant[];
					shippingAddressId: number;
					salesInvoiceType: number;
					creationToken: string;
					isUsualOrder: boolean;
					note?: string;
				}) => {
					// const products: InvoiceProduct[] = params.products.map(
					// 	(p) => {
					// 		const product: InvoiceProduct = {
					// 			productVariantId: p.variant.id,
					// 			quantity: p.quantity,
					// 		};
					// 		if (p.note) product.note = p.note;
					// 		if (p.additions) product.additions = p.additions;
					// 		return product;
					// 	},
					// );
					// const invoice: WebstoreInvoice = {
					// 	products,
					// 	shippingAddressId: params.shippingAddressId,
					// 	salesInvoiceType: params.salesInvoiceType,
					// 	isUsualOrder: params.isUsualOrder,
					// 	note: params.note,
					// };
					// return store.createInvoice({
					// 	invoice,
					// 	creationToken: params.creationToken,
					// });
				},
			};
		}),
	);

const _i = featureType(withCreateInvoiceMethod);
export type CreateInvoiceMethodType = typeof _i.methods;
