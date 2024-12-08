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
import {
	AuthInterceptor,
	AuthnModule,
	ErrorHandlerService,
	LoggerModule,
	LogSeverity,
	StorageModule,
} from '@src/app/core';
import { ChatFeaturesModule } from './features.module';
import { chatRoutes } from '@src/app/view/pages/chat/routes';

export const chatConfig: ApplicationConfig = {
	providers: [
		provideTranslateService({
			defaultLanguage: localStorage.getItem('lang') || 'en',
		}),
		provideAnimationsAsync(),
		importProvidersFrom(
			ChatFeaturesModule,
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
		provideRouter(chatRoutes),
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
