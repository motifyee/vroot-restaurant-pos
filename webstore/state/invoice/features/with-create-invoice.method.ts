import {
	patchState,
	signalStoreFeature,
	type,
	withMethods,
} from '@ngrx/signals';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { CartRepo } from '@webstore/features';
import { invoiceEntityConfig, InvoiceEntityState } from '../invoice.store';
import { addEntity } from '@ngrx/signals/entities';
import { settingsStore } from '@webstore/state/settings';
import { featureType } from '@src/app/view/state/utils/utils';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { ActiveInvoiceFeatureMethodsType } from './with-active-invoice.method';
import { userStore } from '@webstore/state/user';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const CREATE_INVOICE = Symbol('CREATE_INVOICE');

export const withCreateInvoiceMethod = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState>(),
			methods: type<
				LoadingMethod & ActiveInvoiceFeatureMethodsType & ApiMsgMethods
			>(),
		},
		withMethods((store) => {
			const repo = inject(CartRepo),
				settings = inject(settingsStore),
				user = inject(userStore);

			return {
				createInvoice: (params: {
					invoice: CreateInvoice;
					creationToken: string;
				}) => {
					store.setLoading(true);
					const invoice: CreateInvoice = {
						...params.invoice,
						branchId: settings.selectedBranch?.()?.id || 0,
					};

					if (!invoice.salesInvoiceType)
						delete invoice.salesInvoiceType;

					return repo
						.createInvoice({
							...params,
							invoice,
						})
						.pipe(
							tap({
								next: (inv) => {
									patchState(
										store,
										addEntity(
											{
												...inv,
												branchId: (<any>inv).toBranchId,
											},
											invoiceEntityConfig,
										),
									);

									store.deactivateApiMsg(CREATE_INVOICE);

									if (!user.isLoggedIn())
										store.setAnonymousInvoiceId(inv.id);
								},
								error: (err) => {
									console.error(err);
									store.setApiMsg(
										'حدث خطأ ما أثناء إنشاء الفاتورة',
										CREATE_INVOICE,
									);
								},
								finalize: () => store.setLoading(false),
							}),
						);
				},
			};
		}),
	);

const _i = featureType(withCreateInvoiceMethod);
export type CreateInvoiceMethodType = typeof _i.methods;
