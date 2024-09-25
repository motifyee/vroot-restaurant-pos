import { Observable } from 'rxjs';

export abstract class AddressRepo {
	abstract getAddresses(
		params: { customerId: string },
		config?: Config,
	): Observable<AddressDTO[]>;

	abstract createAddress(
		params: {
			customerId: string;
			address: AddressDTO;
		},
		config?: Config,
	): Observable<AddressDTO>;

	abstract updateAddress(
		params: {
			customerId: string;
			address: Partial<AddressDTO>;
		},
		config?: Config,
	): Observable<undefined>;

	abstract deleteAddress(
		params: { addressId: string; customerId: string },
		config?: Config,
	): Observable<undefined>;
}
