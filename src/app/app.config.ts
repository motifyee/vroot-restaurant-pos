import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import {
	HTTP_INTERCEPTORS,
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { LoggerModule, LogSeverity } from './core/services/logger';
import { StorageModule } from './core/services/storage';
import { AuthnModule } from './core/services/auth';
import { ErrorHandlerService } from './core/services/error';
import { AuthInterceptor } from './core/interceptors/api.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
	providers: [
		// BrowserModule,
		provideTranslateService({
			defaultLanguage: localStorage.getItem('lang') || 'en',
		}),
		provideAnimationsAsync(),
		importProvidersFrom(
			RouterModule,
			LoggerModule.forAdaptive(
				LogSeverity.info,
				LogSeverity.info,
				LogSeverity.info,
			),
			StorageModule.forLocalStorage(),
		),
		provideHttpClient(withInterceptorsFromDi()),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		{
			provide: ErrorHandler,
			useClass: ErrorHandlerService,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		ConfirmationService,
		MessageService,
	],
};
