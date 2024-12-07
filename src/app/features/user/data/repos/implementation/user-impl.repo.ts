import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { UserImplMapper } from '../mappers/user-repo.mapper';
import { ENDPOINT, HttpService } from '@src/app/core';
import { UserRepo } from '../../../domain/repo/user.repo';
import { User } from '../../../domain';

@Injectable({
	providedIn: 'root',
})
export class UserImplRepo implements UserRepo {
	userMapper = new UserImplMapper();
	http = inject(HttpService);

	login(params: { username: string; password: string }): Observable<User> {
		return this.http
			.post<UserDTO>(`${ENDPOINT}/login`, params)
			.pipe(map(this.userMapper.mapFrom));
	}

	register(params: { phoneNum: string; password: string }): Observable<User> {
		return this.http
			.post<UserDTO>(`${ENDPOINT}/register`, params)
			.pipe(map(this.userMapper.mapFrom));
	}

	getUserProfile(): Observable<User> {
		return this.http
			.get<UserDTO>(`${ENDPOINT}/user`)
			.pipe(map(this.userMapper.mapFrom));
	}
}
