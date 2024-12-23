import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import {
	AuthInterceptor,
	ErrorHandlerService,
	LoggerModule,
	LogSeverity,
	StorageModule,
} from '@src/app/core';
import { webstoreRoutes } from './webstore.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const webstoreConfig: ApplicationConfig = {
	providers: [
		provideTranslateService({
			defaultLanguage: localStorage.getItem('lang') || 'en',
		}),
		provideAnimationsAsync(),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: 'light',
					ripple: true,
				},
			},
		}),
		importProvidersFrom(
			RouterModule,
			LoggerModule.forAdaptive(
				LogSeverity.info,
				LogSeverity.info,
				LogSeverity.info,
			),
			StorageModule.forLocalStorage(),
		),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(webstoreRoutes),
		{
			provide: ErrorHandler,
			useClass: ErrorHandlerService,
		},
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		ConfirmationService,
		MessageService,
	],
};
