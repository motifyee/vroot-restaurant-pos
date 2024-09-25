import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { LoggerModule, LogSeverity } from './core/services/logger';
import { StorageModule } from './core/services/storage';
import { AuthnModule } from './core/services/auth';
import { ErrorHandlerService } from './core/services/error';
import { AuthInterceptor } from './core/interceptors/api.interceptor';
import { FeaturesModule } from './features';
import { ConfirmationService, MessageService } from 'primeng/api';
import { appStoreToken } from './view/stores/app/app.store';
import { invoiceStoreToken } from './features/invoices/state/invoice/invoice.store';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom(
			RouterModule,
			BrowserModule,
			BrowserAnimationsModule,
			AuthnModule,
			LoggerModule.forAdaptive(
				LogSeverity.info,
				LogSeverity.info,
				LogSeverity.info,
			),
			StorageModule.forLocalStorage(),
			FeaturesModule,
		),
		provideHttpClient(),
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
