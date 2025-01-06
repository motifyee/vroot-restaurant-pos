import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { addEntity } from '@ngrx/signals/entities';
import { settingsStore } from '@webstore/state/settings';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			const repo = inject(CartRepo),
				settings = inject(settingsStore);

			return {
				createInvoice: (params: {
					invoice: WebstoreInvoice;
					creationToken: string;
				}) => {
					params.invoice.toBranchId = settings.selectedBranch?.()?.id;

					return of(params).pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.createInvoice(inv).pipe(
								tapResponse({
									next: (inv) => {
										patchState(
											store,
											addEntity(inv, invoiceEntityConfig),
										);
									},
									error: console.error,
								}),
							),
						),
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
