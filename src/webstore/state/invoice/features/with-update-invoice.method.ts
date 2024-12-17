import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { distinctUntilChanged, of, switchMap, tap, timeout } from 'rxjs';
import { inject } from '@angular/core';
import { updateEntity } from '@ngrx/signals/entities';
import { Invoice } from '@src/app/features/invoices/domain/models/Invoice.model';
import { CartRepo } from '@webstore/features/cart/domain';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				updateInvoice: (inv: Invoice) =>
					of(inv).pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.updateInvoice(inv).pipe(
								tap(() =>
									patchState(
										store,
										updateEntity(
											{
												id: inv.id,
												changes: inv,
											},
											invoiceEntityConfig,
										),
									),
								),
							),
						),
					),
			};
		}),
	);
}
