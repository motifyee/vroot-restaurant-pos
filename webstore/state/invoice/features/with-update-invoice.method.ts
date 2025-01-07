import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { setEntity } from '@ngrx/signals/entities';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{ state: type<InvoiceEntityState>() },
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				updateInvoice: (inv: GetInvoice) => {
					const products = inv.products.map<CreateInvoiceProduct>(
						(p) => ({
							productVariantId: p.productVariantId,
							additions: p.additions?.map<CreateAddition>(
								(a) => ({
									id: a.id,
									with: a.with,
									quantity: a.quantity,
								}),
							),
							quantity: p.quantity,
							note: p.note,
						}),
					);

					const invoice: UpdateInvoice = {
						...inv,
						products,
					};

					return repo
						.updateInvoice(invoice)
						.pipe(
							tap((inv) =>
								patchState(
									store,
									setEntity(inv, invoiceEntityConfig),
								),
							),
						);
				},
			};
		}),
	);
}

const _i = featureType(withUpdateInvoiceMethod);
export type UpdateInvoiceMethodType = typeof _i.methods;
