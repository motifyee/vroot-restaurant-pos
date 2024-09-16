import { Injectable } from '@angular/core';
import { AuthnProvider } from '../authn.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AppleAuthnService extends AuthnProvider {
	public override revoke(): boolean {
		throw new Error('Method not implemented.');
	}
	public override renderButton(selector: string): boolean {
		throw new Error('Method not implemented.');
	}
	public override login() {
		// send to api

		return new Observable<boolean>();
	}

	public override promptLogin() {
		// prompt saved accounts
		// must verify by otp | email | sms

		return new Observable<boolean>();
	}

	public override logout(): boolean {
		return true;
	}
	public override isLoggedin(): boolean {
		return true;
	}
	public override isAuthorized(): boolean {
		return true;
	}
}
