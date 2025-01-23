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
import {
	invoiceEntityConfig,
	InvoiceEntityState,
	InvoiceStoreState,
} from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const UPDATE_INVOICE = Symbol('UPDATE_INVOICE');

export function withUpdateInvoiceMethod<_>() {
	return signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			methods: type<LoadingMethod & ApiMsgMethods>(),
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
						shippingAddressId: store.selectedAddress()?.id,
					};

					return repo.updateInvoice(invoice).pipe(
						tap({
							next: (inv) => {
								patchState(
									store,
									setEntity(
										{
											...inv,
											branchId: (<any>inv).toBranchId,
										},
										invoiceEntityConfig,
									),
								);
								store.deactivateApiMsg(UPDATE_INVOICE);
							},
							error: (err) => {
								console.error(err);
								store.setApiMsg(
									'حدث خطأ ما أثناء تعديل الفاتورة',
									UPDATE_INVOICE,
								);
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
