import { Base } from '@core';

export class Address implements AddressEntity {
	id: number;
	address: string;
	isDefault: boolean;

	constructor(param: AddressEntity) {
		this.id = param.id;
		this.address = param.address;
		this.isDefault = param.isDefault;
	}
}
