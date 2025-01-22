import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { addEntities, addEntity } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { CartRepo, InvoicesFilter } from '@webstore/features';
import {
	invoiceEntityConfig,
	InvoiceEntityState,
	InvoiceStoreState,
} from '../invoice.store';
import { userStore } from '@webstore/state/user';
import { GetInvoiceByIdMethodType } from './with-get-invoice-by-id.method';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { tap } from 'rxjs';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const GET_INVOICES = Symbol('GET_INVOICES');

export function withGetInvoicesMethod<_>() {
	return signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			methods: type<
				GetInvoiceByIdMethodType & LoadingMethod & ApiMsgMethods
			>(),
		},
		withMethods((store) => {
			const repo = inject(CartRepo);
			const user = inject(userStore);

			return {
				getInvoices: (params: InvoicesFilter) => {
					store.setLoading(true);

					// If user is logged in, get all active invoices
					if (user.isLoggedIn())
						return repo
							.getInvoices(params)
							.pipe(
								tap({
									next: (invs: GetInvoice[]) => {
										patchState(
											store,
											addEntities(
												invs,
												invoiceEntityConfig,
											),
										);

										store.deactivateApiMsg(GET_INVOICES);
									},
									error: (err: Error) => {
										console.error(err);
										store.setApiMsg(
											'حدث خطأ ما أثناء تحميل الفواتير',
											GET_INVOICES,
										);
									},

									finalize: () => store.setLoading(false),
								}),
							)
							.subscribe();

					// If not logged in, try to load anonymous invoice
					const anonymousId = store._anonymousInvoiceId();
					if (!anonymousId) {
						store.setLoading(false);
						return;
					}

					// Load the anonymous invoice and set it as active
					return store
						.getInvoiceById({ id: +anonymousId })
						.pipe(
							tap({
								next: (inv) => {
									patchState(
										store,
										addEntity(inv, invoiceEntityConfig),
									);
								},
								error: (err) => {
									console.error(
										'Failed to load invoice:',
										err,
									);
								},
								finalize: () => store.setLoading(false),
							}),
						)
						.subscribe();
				},
			};
		}),
	);
}

const _i = featureType(withGetInvoicesMethod);
export type GetInvoicesMethodType = typeof _i.methods;
