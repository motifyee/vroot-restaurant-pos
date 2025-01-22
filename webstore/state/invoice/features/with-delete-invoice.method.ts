import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { removeEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const DELETE_INVOICE = Symbol('DELETE_INVOICE');

export const withDeleteInvoiceMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod & ApiMsgMethods>(),
		},
		withMethods((state) => {
			const repo = inject(CartRepo);

			return {
				deleteInvoice: (params: { id: number }) => {
					state.setLoading(true);
					return repo.deleteInvoice(params).pipe(
						tap({
							next: () => {
								patchState(
									state,
									removeEntity(
										params.id,
										invoiceEntityConfig,
									),
								);

								state.deactivateApiMsg(DELETE_INVOICE);
							},
							error: (err) => {
								console.error(err);
								state.setApiMsg(
									'حدث خطأ ما أثناء حذف الفاتورة',
									DELETE_INVOICE,
								);
							},
							finalize: () => state.setLoading(false),
						}),
					);
				},
			};
		}),
	);

const _i = featureType(withDeleteInvoiceMethod);
export type WithDeleteInvoiceMethodType = typeof _i.methods;
