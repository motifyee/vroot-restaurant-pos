import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthnProvider } from './authn.model';
import { GoogleAuthnService } from './providers/google.authn.service';
import { EmailAuthnService } from './providers/email.authn.service';
import { AuthnService } from './authn.service';

// AuthnService
@NgModule({
	providers: [EmailAuthnService, GoogleAuthnService],
})
export class AuthnModule {
	// static forRoot(): ModuleWithProviders<AuthnModule> {
	// 	return {
	// 		ngModule: AuthnModule,
	// 		providers: [
	// 			{
	// 				provide: AuthnProvider,
	// 				useClass: EmailAuthnService,
	// 				multi: true,
	// 			},
	// 			{
	// 				provide: AuthnProvider,
	// 				useClass: GoogleAuthnService,
	// 				multi: true,
	// 			},
	// 		],
	// 	};
	// }
}

// @NgModule({
// 	providers: [EmailAuthnService, GoogleAuthnService],
// })
// export class AuthnModule {}
