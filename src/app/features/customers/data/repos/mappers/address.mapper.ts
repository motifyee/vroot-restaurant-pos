import { Mapper } from '@core';
import { Address } from '../../../models/address.model';

export class AddressImplMapper extends Mapper<AddressEntity, Address> {
	override mapFrom(param: AddressEntity): Address {
		return new Address(param);
	}
	override mapTo(param: Address): AddressEntity {
		return {
			id: param.id,
			address: param.address,
			isDefault: param.isDefault,
		};
	}
}
