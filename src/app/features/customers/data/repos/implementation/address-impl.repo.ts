import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddressRepo } from '@src/app/features';
import { ENDPOINT, HttpService } from '@src/app/core';

@Injectable({
	providedIn: 'root',
})
export class AddressImplRepo implements AddressRepo {
	http = inject(HttpService);

	getAddresses(
		{ customerId }: { customerId: string },
		config?: Config,
	): Observable<AddressDTO[]> {
		return this.http
			.get<
				Response<AddressDTO[]>
			>(`${ENDPOINT}/api/customers/${customerId}/addresses`, undefined, config)
			.pipe(map((res) => res.data!)); //.map(this.addressMapper.mapFrom)));
	}

	createAddress(
		params: { customerId: string; address: AddressDTO },
		config?: Config,
	): Observable<AddressDTO> {
		return this.http
			.post<
				Response<{ id: number }>
			>(`${ENDPOINT}/api/customers/${params.customerId}/addresses`, params.address, undefined, config)
			.pipe(
				map((res) => ({
					...params.address,
					id: res.data!.id,
				})),
			);
	}

	updateAddress(
		params: { customerId: string; address: Partial<AddressDTO> },
		config?: Config,
	): Observable<undefined> {
		return this.http.put(
			`${ENDPOINT}/api/customers/${params.customerId}/addresses`,
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
			`${ENDPOINT}/api/customers/${params.customerId}/addresses/${params.addressId}`,
			undefined,
			config,
		);
	}
}
