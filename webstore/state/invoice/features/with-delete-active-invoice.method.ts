import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { InvoiceEntityState, InvoiceStoreState } from '../invoice.store';
import {
	ActiveInvoiceFeaturePropsType,
	ActiveInvoiceFeatureMethodsType,
} from './with-active-invoice.method';
import { WithDeleteInvoiceMethodType } from './with-delete-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { finalize, tap } from 'rxjs';

export const withDeleteActiveInvoice = <_>() =>
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
				deleteActiveInvoice: () => {
					const activeInvoice = store.activeInvoice?.();

					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}

					return store
						.deleteInvoice({ id: activeInvoice.id })
						.pipe(tap(() => store.clearAnonymousInvoiceId()));
				},
			};
		}),
	);

let _i = featureType(withDeleteActiveInvoice);
export type RemoveActiveInvoiceMethodType = typeof _i.methods;
