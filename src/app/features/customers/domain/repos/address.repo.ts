import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

export abstract class AddressRepo {
	abstract getAddresses(
		params: { customerId: string },
		config?: Config,
	): Observable<Address[]>;

	abstract createAddress(
		params: {
			customerId: string;
			address: AddressEntity;
		},
		config?: Config,
	): Observable<Address>;

	abstract updateAddress(
		params: {
			customerId: string;
			address: Partial<AddressEntity>;
		},
		config?: Config,
	): Observable<undefined>;

	abstract deleteAddress(
		params: { addressId: string; customerId: string },
		config?: Config,
	): Observable<undefined>;
}
