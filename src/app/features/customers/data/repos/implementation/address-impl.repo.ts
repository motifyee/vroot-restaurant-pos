import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ENV, HttpService } from '@core';
import { AddressImplMapper } from '../mappers/address.mapper';
import { AddressRepo, Address } from '@features';

@Injectable({
	providedIn: 'root',
})
export class AddressImplRepo implements AddressRepo {
	http = inject(HttpService);
	addressMapper = new AddressImplMapper();

	getAddresses(
		{ customerId }: { customerId: string },
		config?: Config,
	): Observable<Address[]> {
		return this.http
			.get<Response<AddressEntity[]>>(
				`${ENV.endpoint}/api/customers/${customerId}/addresses`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!.map(this.addressMapper.mapFrom)));
	}

	createAddress(
		params: { customerId: string; address: AddressEntity },
		config?: Config,
	): Observable<Address> {
		return this.http
			.post<Response<{ id: number }>>(
				`${ENV.endpoint}/api/customers/${params.customerId}/addresses`,
				params.address,
				undefined,
				config,
			)
			.pipe(
				map((res) =>
					this.addressMapper.mapFrom({
						...params.address,
						id: res.data!.id,
					}),
				),
			);
	}

	updateAddress(
		params: { customerId: string; address: Partial<AddressEntity> },
		config?: Config,
	): Observable<undefined> {
		return this.http.put(
			`${ENV.endpoint}/api/customers/${params.customerId}/addresses`,
			params.address,
			undefined,
			config,
		);
	}

	deleteAddress(
		params: { addressId: string; customerId: string },
		config?: Config,
	): Observable<undefined> {
		return this.http.delete(
			`${ENV.endpoint}/api/customers/${params.customerId}/addresses/${params.addressId}`,
			undefined,
			config,
		);
	}
}
