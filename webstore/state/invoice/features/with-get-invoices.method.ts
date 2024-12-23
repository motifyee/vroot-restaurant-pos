import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { CartRepo, InvoicesFilter } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';

export function withGetInvoicesMethod<_>() {
	return signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				getInvoices: rxMethod<InvoicesFilter>(
					pipe(
						switchMap((params) =>
							repo.getInvoices(params).pipe(
								tapResponse({
									next: (invs) =>
										patchState(
											store,
											addEntities(
												invs,
												invoiceEntityConfig,
											),
										),
									error: console.error,
								}),
							),
						),
					),
				),
			};
		}),
	);
}
