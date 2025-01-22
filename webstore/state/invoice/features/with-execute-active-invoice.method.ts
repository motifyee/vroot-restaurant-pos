import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import {
	ActiveInvoiceFeaturePropsType,
	ActiveInvoiceFeatureMethodsType,
} from './with-active-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { Observable, of, tap } from 'rxjs';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { ApiMsgMethods } from '@src/app/features/base/state/with-api-msg.method';

export const EXECUTE_INVOICE = Symbol('EXECUTE_INVOICE');

export const withExecuteActiveInvoice = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				UpdateInvoiceMethodType &
					ActiveInvoiceFeatureMethodsType &
					LoadingMethod &
					ApiMsgMethods
			>(),
		},
		withMethods((store) => {
			return {
				executeActiveInvoice: (): Observable<GetInvoice | null> => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return of(null);
					}

					store.setLoading(true);

					const invoice: GetInvoice = {
						...activeInvoice,
						preparationStage: 'preparing',
					};

					return store.updateInvoice(invoice).pipe(
						tap({
							next: () => {
								// Clear the anonymous invoice ID after execution
								store.clearAnonymousInvoiceId();

								store.deactivateApiMsg(EXECUTE_INVOICE);
							},
							error: (err) => {
								console.error(
									'Failed to execute invoice:',
									err,
								);

								store.setApiMsg(
									'حدث خطأ ما أثناء تنفيذ الفاتورة',
									EXECUTE_INVOICE,
								);
							},
							finalize: () => store.setLoading(false),
						}),
					);
				},
			};
		}),
	);

const _i = featureType(withExecuteActiveInvoice);
export type ExecuteActiveInvoiceMethodType = typeof _i.methods;
