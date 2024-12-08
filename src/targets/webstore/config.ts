import {
	ApplicationConfig,
	ErrorHandler,
	importProvidersFrom,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService } from '@ngx-translate/core';
import { WebstoreFeaturesModule } from './features.module';
import {
	AuthInterceptor,
	AuthnModule,
	ErrorHandlerService,
	LoggerModule,
	LogSeverity,
	StorageModule,
} from '@src/app/core';
import { webstoreRoutes } from '@src/app/view/pages/webstore/routes';

export const webstoreConfig: ApplicationConfig = {
	providers: [
		provideTranslateService({
			defaultLanguage: localStorage.getItem('lang') || 'en',
		}),
		provideAnimationsAsync(),
		importProvidersFrom(
			WebstoreFeaturesModule,
			RouterModule,
			AuthnModule,
			LoggerModule.forAdaptive(
				LogSeverity.info,
				LogSeverity.info,
				LogSeverity.info,
			),
			StorageModule.forLocalStorage(),
		),
		provideHttpClient(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(webstoreRoutes),
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
