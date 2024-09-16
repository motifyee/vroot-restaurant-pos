import { Mapper } from '@core';
import { Customer } from '../../../models/customer.model';
import { Classification } from '../../../models/classification.model';

export class CustomerImplMapper extends Mapper<CustomerEntity, Customer> {
	override mapFrom(param: CustomerEntity): Customer {
		// TODO inject from state management and throw if not init
		let cs = {} as Classification;
		return new Customer(param, cs);
	}
	override mapTo(param: Customer): CustomerEntity {
		return {
			id: param.id,
			firstName: param.firstName,
			lastName: param.lastName,
			mobile: param.mobile,
			phone: param.phone,
			classId: param.classification?.id ?? 0,
		};
	}
}
