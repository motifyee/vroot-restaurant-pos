import { Observable } from 'rxjs';

export abstract class AuthnProvider {
	public abstract login(
		username?: string,
		password?: string,
	): Observable<boolean>;
	public abstract promptLogin(): Observable<boolean>;
	public abstract renderButton(selector: string): boolean;
	public abstract logout(): boolean;
	public abstract revoke(): boolean;
	public abstract isLoggedin(): boolean;
	public abstract isAuthorized(): boolean;
}
