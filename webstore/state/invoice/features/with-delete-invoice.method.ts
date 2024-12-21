import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((state) => {
			let repo = inject(CartRepo);

			return {
				deleteInvoice: rxMethod<WebstoreInvoice>(
					pipe(
						distinctUntilChanged(),
						switchMap((inv) =>
							repo.deleteInvoice(inv).pipe(
								tapResponse({
									next: (inv) =>
										patchState(
											state,
											removeEntity(
												inv.id!,
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
