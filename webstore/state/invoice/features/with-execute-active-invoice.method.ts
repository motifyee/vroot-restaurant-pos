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

export const withExecuteActiveInvoice = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				UpdateInvoiceMethodType &
					ActiveInvoiceFeatureMethodsType &
					LoadingMethod
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
							},
							error: (err) => {
								console.error(
									'Failed to execute invoice:',
									err,
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
