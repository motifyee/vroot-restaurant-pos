import { Mapper } from '@src/app/core';
import { Customer } from '../../../domain';
import { inject } from '@angular/core';
import { settingsStore } from '@src/app/features/settings';

export class CustomerImplMapper extends Mapper<CustomerDTO, Customer> {
	store = inject(settingsStore);

	override mapFrom(param: CustomerDTO): Customer {
		return this.store.mapEntityToCustomer(param);
	}

	override mapTo(param: Customer): CustomerDTO {
		return {
			...param,
			classificationId: param.classification?.id ?? 0,
		};
	}
}
