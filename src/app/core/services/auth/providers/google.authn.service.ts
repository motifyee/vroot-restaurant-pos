import { Injectable } from '@angular/core';
import { ENV } from '../../../environments/env';
import { CredentialResponse } from 'google-one-tap';
import { AuthnProvider } from '../authn.model';
import { Observable } from 'rxjs';

// https://developers.google.com/identity/gsi/web/guides/display-button#javascript
@Injectable({
	providedIn: 'root',
})
export class GoogleAuthnService extends AuthnProvider {
	handleCredentialResponse(response: CredentialResponse) {
		console.log(response);
		localStorage.setItem('token', response.credential);
		// this.service.isLoggedIn.next(true);
		// this.service.user.next(res.user);
		// this.router.navigate(['/']);
	}

	private _initiazed = false;
	private initializeGoogleLogin() {
		!this._initiazed &&
			(this._initiazed = true) && // @ts-ignore
			google.accounts.id.initialize({
				client_id: ENV.googleClientId,
				callback: this.handleCredentialResponse.bind(this),
				auto_select: true,
				cancel_on_tap_outside: false,
				ux_mode: 'redirect',
			});

		// initialize oauth2 | oidc
		// @ts-ignore
		// this.client = google.accounts.oauth2.initCodeClient({
		// 	client_id: ENV.googleClientId,
		// 	scope: 'https://www.googleapis.com/auth/userinfo.profile',
		// 	callback: (response: CredentialResponse) => {
		// 		this.handleCredentialResponse(response);
		// 	},
		// 	ux_mode: 'popup',
		// });
	}

	public override renderButton(selector: string) {
		this.initializeGoogleLogin();
		// @ts-ignore
		google.accounts.id.renderButton(
			document.getElementById(selector) as HTMLElement,
			{ theme: 'outline', size: 'large', shape: 'circle', type: 'icon' }, // customization attributes
		);
		return true;
	}

	public override login(username?: string, password?: string) {
		this.initializeGoogleLogin();

		// TODO Gurantee lib is loaded b4 used
		// hint: check exists || reload
		// window.onGoogleLibraryLoad = () => {}

		return new Observable<boolean>();
	}

	// Display One Tap prompt
	public override promptLogin() {
		this.initializeGoogleLogin();
		// @ts-ignore

		google.accounts.id.prompt((notification: PromptMomentNotification) => {
			console.log('notification', notification);
			if (
				notification.isNotDisplayed() ||
				notification.isSkippedMoment()
			) {
				// continue with another identity provider.
			} else {
				notification.getNotDisplayedReason();
			}
		});
		return new Observable<boolean>();
	}

	public override logout(): boolean {
		// @ts-ignore
		google.accounts.id.disableAutoSelect();

		return true;
	}

	public override revoke(): boolean {
		// @ts-ignore
		google.accounts.id.revoke('user@google.com', (done) => {
			console.log('consent revoked');
		});
		return true;
	}

	public override isLoggedin(): boolean {
		return true;
	}
	public override isAuthorized(): boolean {
		return true;
	}
}
