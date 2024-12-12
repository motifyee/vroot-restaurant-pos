import { Observable } from 'rxjs';

export interface LoginParams {
	countryCode: string;
	phone: string;
	password: string;
	companyId: number;
}
export interface RegisterParams {
	countryCode: string;
	phone: string;
	name: string;
	companyId: number;
	password: string;
}

export abstract class UserRepo {
	abstract login(params: LoginParams): Observable<User>;

	abstract checkPhone(params: {
		countryCode: string;
		phone: string;
		companyId: number;
	}): Observable<boolean>;

	abstract register(params: RegisterParams): Observable<User>;
}
