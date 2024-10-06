import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { Invoice } from '../../../domain/models/Invoice.model';
import { distinctUntilChanged, of, switchMap, tap, timeout } from 'rxjs';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { UpdateInvoiceUseCase } from '../../../domain/usecases/update-invoice.usecase';
import { EntityState, updateEntity } from '@ngrx/signals/entities';

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{ state: type<EntityState<Invoice>>() },
		withMethods((store) => {
			let usecase = inject(UpdateInvoiceUseCase);

			return {
				updateInvoice: (inv: Invoice) =>
					of(inv).pipe(
						timeout(1000),
						distinctUntilChanged(),
						switchMap((inv) =>
							usecase.execute(inv).pipe(
								tap(() =>
									patchState(
										store,
										updateEntity({
											id: inv.id,
											changes: inv,
										}),
									),
								),
							),
						),
					),
			};
		}),
	);
}
