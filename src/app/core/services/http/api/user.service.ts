/* eslint-disable no-unused-vars */
import { Injectable, inject } from '@angular/core';
import { HttpService } from '../http.service';
import { StorageService } from '../../storage/storage.service';
import { tap } from 'rxjs';
import { User } from '@features';
/**
 * @description
 * stores:
 * - user data
 * - user state
 * - user actions
 * - user permissions
 * - user settings
 * - user preferences
 */

@Injectable({
	providedIn: 'root',
})
export class UserService implements IUserActions {
	storage = inject(StorageService);
	http = inject(HttpService);

	login = (email: string, pwd: string, opt: Config) => {
		return this.http
			.post<ILoginInfo>('api/login', { email, pwd }, {}, opt)
			.pipe(
				tap((res) => {
					this.storage.set('token', res?.token ?? '');
				}),
			);
	};

	logout = (opt: Config) => {
		return this.http
			.get('api/logout', {}, opt)
			.pipe(tap(() => this.storage.clear()));
	};

	register = (email: string, pwd: string, opt: Config) =>
		this.http
			.post<ILoginInfo>('api/register', { email, pwd }, {}, opt)
			.pipe(
				tap((res) => {
					this.storage.set('token', res?.token ?? '');
				}),
			);

	getUser = (opt: Config) => this.http.get('api/user', {}, opt);

	updateUser = (user: User, opt: Config) =>
		this.http.put('api/user', user, {}, opt);

	deleteUser = (opt: Config) => this.http.delete('api/user', {}, opt);

	getUserSettings = (opt: Config) =>
		this.http.get<IUserSettings>(`api/user/settings`, {}, opt);

	updateUserSettings = (settings: IUserSettings, opt: Config) =>
		this.http.put('api/user/settings', settings, {}, opt);
}
