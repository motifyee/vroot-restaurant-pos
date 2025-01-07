import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { finalize, tap } from 'rxjs';
import { inject } from '@angular/core';
import { setEntity } from '@ngrx/signals/entities';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod>(),
		},
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				updateInvoice: (inv: GetInvoice) => {
					store.setLoading(true);

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

					return repo.updateInvoice(invoice).pipe(
						tap({
							next: (inv) => {
								patchState(
									store,
									setEntity(inv, invoiceEntityConfig),
								);
							},
							error: (err) => {
								console.error(err);
							},
							finalize: () => store.setLoading(false),
						}),
					);
				},
			};
		}),
	);
}

const _i = featureType(withUpdateInvoiceMethod);
export type UpdateInvoiceMethodType = typeof _i.methods;
