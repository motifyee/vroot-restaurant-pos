import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { ActiveInvoiceFeaturePropsType } from './with-active-invoice.method';
import { UpdateInvoiceMethodType } from './with-update-invoice.method';
import { featureType } from '@src/app/view/state/utils/utils';
import { LoadingMethod } from '@src/app/features/base/state/with-loading.method';
import { tap } from 'rxjs';

export const withUpdateActiveInvoice = <_>() =>
	signalStoreFeature(
		{
			props: type<ActiveInvoiceFeaturePropsType>(),
			methods: type<UpdateInvoiceMethodType & LoadingMethod>(),
		},
		withMethods((store) => {
			return {
				updateActiveInvoice: (
					updates: Partial<Omit<GetInvoice, 'id' | 'products'>>,
				) => {
					const activeInvoice = store.activeInvoice?.();
					if (!activeInvoice) {
						console.error('No active invoice found');
						return;
					}
					store.setLoading(true);
					const invoice: GetInvoice = {
						...activeInvoice,
						...updates,
					};
					return store.updateInvoice(invoice).pipe(
						tap({
							error: (err) => {
								console.error(
									'Failed to update active invoice:',
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

const _i = featureType(withUpdateActiveInvoice);
export type UpdateActiveInvoiceMethodType = typeof _i.methods;
