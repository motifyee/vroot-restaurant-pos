import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { UserImplMapper } from '../mappers/user-repo.mapper';
import { User } from '../../../models/user.model';
import { ENV, HttpService } from '@core';
import { UserRepo } from '../../user.repo';

@Injectable({
	providedIn: 'root',
})
export class UserImplRepo implements UserRepo {
	userMapper = new UserImplMapper();
	http = inject(HttpService);

	login(params: { username: string; password: string }): Observable<User> {
		return this.http
			.post<UserEntity>(`${ENV.endpoint}/login`, params)
			.pipe(map(this.userMapper.mapFrom));
	}

	register(params: { phoneNum: string; password: string }): Observable<User> {
		return this.http
			.post<UserEntity>(`${ENV.endpoint}/register`, params)
			.pipe(map(this.userMapper.mapFrom));
	}

	getUserProfile(): Observable<User> {
		return this.http
			.get<UserEntity>(`${ENV.endpoint}/user`)
			.pipe(map(this.userMapper.mapFrom));
	}
}
