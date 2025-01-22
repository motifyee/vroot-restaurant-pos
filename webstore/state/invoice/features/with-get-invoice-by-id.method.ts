import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { featureType } from '@src/app/view/state/utils/utils';
import { tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const GET_INVOICE_BY_ID = Symbol('GET_INVOICE_BY_ID');

export const withGetInvoiceByIdMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<LoadingMethod & ApiMsgMethods>(),
		},
		withMethods((store) => {
			let repo = inject(CartRepo);

			return {
				getInvoiceById: (params: { id: number }) => {
					store.setLoading(true);

					return repo.getInvoiceById(params).pipe(
						tap({
							next: (inv) => {
								patchState(
									store,
									addEntity(inv, invoiceEntityConfig),
								);

								store.deactivateApiMsg(GET_INVOICE_BY_ID);
							},
							error: (err) => {
								console.error(err);
								store.setApiMsg(
									'حدث خطأ ما أثناء تحميل الفاتورة',
									GET_INVOICE_BY_ID,
								);
							},
							finalize: () => store.setLoading(false),
						}),
					);
				},
			};
		}),
	);

const _i = featureType(withGetInvoiceByIdMethod);
export type GetInvoiceByIdMethodType = typeof _i.methods;
