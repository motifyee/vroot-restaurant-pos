import { Mapper } from '@src/app/core';
import { Customer } from '../../../domain';

export class CustomerImplMapper extends Mapper<CustomerDTO, Customer> {
	override mapFrom(param: CustomerDTO): Customer {
		return {
			...param,
			classification: {} as ClassificationDTO,
			// classification:
			// 	this.store.classificationsEntityMap()[param.classificationId],
		};
	}

	override mapTo(param: Customer): CustomerDTO {
		return {
			...param,
			classificationId: param.classification?.id ?? 0,
		};
	}
}
