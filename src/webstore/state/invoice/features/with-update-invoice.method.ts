import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { updateEntity } from '@ngrx/signals/entities';
import { CartRepo } from '@webstore/features/cart/domain';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				updateInvoice: (inv: WebstoreInvoice) =>
					of(inv).pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.updateInvoice(inv).pipe(
								tap(() =>
									patchState(
										store,
										updateEntity(
											{
												id: inv.id!,
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
