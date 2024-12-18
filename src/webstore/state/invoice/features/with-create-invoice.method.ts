import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { CartRepo } from '@webstore/features/cart/domain';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { addEntity } from '@ngrx/signals/entities';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				createInvoice: (params: {
					invoice: WebstoreInvoice;
					creationToken: string;
				}) =>
					of(params).pipe(
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
					),
			};
		}),

		withMethods((store) => {
			return {
				createInvoiceFromCartProducts: (params: {
					products: CartProduct[];
					shippingAddressId: number;
					salesInvoiceType: number;
					creationToken: string;
				}) => {
					const products: InvoiceProduct[] = params.products.map(
						(p) =>
							({
								productVariantId: p.variant.id,
								quantity: p.quantity,
								note: p.note,
							}) as InvoiceProduct,
					);

					const invoice: WebstoreInvoice = {
						products,
						shippingAddressId: params.shippingAddressId,
						salesInvoiceType: params.salesInvoiceType,
					};

					return store.createInvoice({
						invoice,
						creationToken: params.creationToken,
					});
				},
			};
		}),
	);
