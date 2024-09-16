import { Base } from '@core';
import { Address } from './address.model';
import { Classification } from './classification.model';

export class Customer {
	id: string;
	firstName: string;
	lastName?: string;
	phone?: string;
	mobile?: string;
	classification: Classification;
	addresses?: Address[];

	constructor(
		params: CustomerEntity,
		classification: Classification,
		addresses?: Address[],
	) {
		// super();
		this.id = params.id;
		this.firstName = params.firstName;
		this.lastName = params.lastName;
		this.phone = params.phone;
		this.mobile = params.mobile;
		this.classification = classification;
		this.addresses = addresses;
	}
}
