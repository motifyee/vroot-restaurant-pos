import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { ENDPOINT, HttpService } from '@src/app/core';
import {
	LoginParams,
	RegisterParams,
	UpdateAddressParams,
	UserRepo,
} from '../../domain/repo/user.repo';
import { uuidv4 } from '@src/app/view/state/app/utils/uuid';

export class UserImplRepo implements UserRepo {
	http = inject(HttpService);

	login(params: LoginParams): Observable<User> {
		return this.http.post<User>(
			`${ENDPOINT}/api/accounts/store/login`,
			params,
		);
	}

	checkPhone(params: {
		countryCode: string;
		phone: string;
		companyId: number;
	}): Observable<boolean> {
		return this.http.post<boolean>(
			`${ENDPOINT}/api/accounts/store/checksignup`,
			params,
		);
	}

	register(params: RegisterParams): Observable<User> {
		return this.http.post<User>(
			`${ENDPOINT}/api/accounts/store/register`,
			params,
			{
				headers: {
					creationToken: uuidv4(), // !TODO-FIX: move to calling component
				},
			},
		);
	}

	// ###########################################################################

	createAddress(params: UpdateAddressParams): Observable<Address> {
		return this.http.post<Address>(
			`${ENDPOINT}/api/store/user/addresses`,
			{
				details: params.details,
				title: params.title,
				isDefault: params.isDefault,
			},
			{
				headers: {
					creationToken: uuidv4(), // !TODO-FIX: move to calling component
				},
			},
		);
	}

	getAddresses(params: { userId: string }): Observable<Address[]> {
		return this.http.get<Address[]>(`${ENDPOINT}/api/store/user/addresses`);
	}

	deleteAddress(params: { userId: string; id: number }): Observable<boolean> {
		return this.http.delete(
			`${ENDPOINT}/api/store/user/addresses/${params.id}`,
		);
	}

	updateAddress(params: UpdateAddressParams): Observable<Address> {
		return this.http.put<Address>(
			`${ENDPOINT}/api/store/user/addresses`,
			params,
		);
	}
}
