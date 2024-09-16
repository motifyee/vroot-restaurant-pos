import { Inject, Injectable, inject } from '@angular/core';
import { AuthnProvider } from './authn.model';
import { Observable } from 'rxjs';

// no viable use case yet
@Injectable({
	providedIn: 'root',
})
export class AuthnService extends AuthnProvider {
	@Inject(AuthnProvider) private providers?: AuthnProvider[];

	public override login(
		username?: string | undefined,
		password?: string | undefined,
	): Observable<boolean> {
		throw new Error('Method not implemented.');
	}
	public override promptLogin(): Observable<boolean> {
		throw new Error('Method not implemented.');
	}
	public override renderButton(selector: string): boolean {
		throw new Error('Method not implemented.');
	}
	public override logout(): boolean {
		throw new Error('Method not implemented.');
	}
	public override revoke(): boolean {
		throw new Error('Method not implemented.');
	}
	public override isLoggedin(): boolean {
		throw new Error('Method not implemented.');
	}
	public override isAuthorized(): boolean {
		throw new Error('Method not implemented.');
	}
}
