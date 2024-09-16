import { Observable } from 'rxjs';
import { User } from '../models';

export abstract class UserRepo {
	abstract login(params: {
		username: string;
		password: string;
	}): Observable<User>;

	abstract register(params: {
		phoneNum: string;
		password: string;
	}): Observable<User>;

	abstract getUserProfile(): Observable<User>;
}
