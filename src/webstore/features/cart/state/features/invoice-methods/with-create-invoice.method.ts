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

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<EntityState<Invoice>>() },
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
										patchState(store, addEntity(inv)),
									error: console.error,
								}),
							),
						),
					),
			};
		}),
	);
