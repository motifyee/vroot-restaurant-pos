import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { addEntity, EntityState } from '@ngrx/signals/entities';
import { CartRepo } from '@webstore/features/cart/domain';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				createInvoice: (params: {
					invoice: Invoice;
					creationToken: string;
				}) =>
					of(params).pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.createInvoice(inv).pipe(
								tapResponse({
									next: (inv) =>
										patchState(
											store,
											addEntity(inv, invoiceEntityConfig),
										),
									error: console.error,
								}),
							),
						),
					),
			};
		}),
	);
