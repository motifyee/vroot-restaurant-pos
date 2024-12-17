import { Customer } from '@src/app/features';
import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { NamedEntityState } from '@ngrx/signals/entities';

// used inside CustomerMapper
// must have populated classifications
export function withMapEntityToCustomerMethod<_>() {
	return signalStoreFeature(
		{
			state: type<
				NamedEntityState<ClassificationDTO, 'classifications'>
			>(),
		},
		withMethods((store) => {
			return {
				mapEntityToCustomer: (entity: CustomerDTO) => {
					let c: Customer = {
						...entity,
						classification:
							store.classificationsEntityMap()[
								entity.classificationId
							],
					};
					return c;
				},
			};
		}),
	);
}
