import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ENDPOINT, HttpService } from '@src/app/core';
import {
	LoginParams,
	RegisterParams,
	UserRepo,
} from '../../domain/repo/user.repo';

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
		);
	}
}
