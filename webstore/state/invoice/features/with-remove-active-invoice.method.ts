import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import {
	ActiveInvoiceFeaturePropsType,
	ActiveInvoiceFeatureMethodsType,
} from './with-active-invoice.method';
import { WithDeleteInvoiceMethodType } from './with-delete-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';

export const withRemoveActiveInvoice = <_>() =>
	signalStoreFeature(
		{
			state: type<InvoiceEntityState & InvoiceStoreState>(),
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<
				WithDeleteInvoiceMethodType & ActiveInvoiceFeatureMethodsType
			>(),
		},
		withMethods((store) => {
			return {
				removeActiveInvoice: () => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}

					return store
						.deleteInvoice({ id: activeInvoice.id })
						.subscribe({
							next: () => {
								// Clear the anonymous invoice ID first
								store.clearAnonymousInvoiceId();
							},
							error: console.error,
						});
				},
			};
		}),
	);

let _i = featureType(withRemoveActiveInvoice);
export type RemoveActiveInvoiceMethodType = typeof _i.methods;
