import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import {
	LoggerProvider as LoggerProvider,
	LogSeverity,
	ConsoleLoggerSeverityToken,
	ServerLoggerSeverityToken,
	DBLoggerSeverityToken,
} from './logger.model';
import { ConsoleLoggerService } from './providers/console.logger.service';
import { ServerLoggerService } from './providers/server.logger.service';
import { DbLoggerService } from './providers/db.logger.service';
import { IS_DEVMODE, IS_TESTMODE } from '../../environments';

@NgModule({
	providers: [
		LoggerService,

		ConsoleLoggerService,
		DbLoggerService,
		ServerLoggerService,
	],
})
export class LoggerModule {
	static forDev(
		consoleSeverity: LogSeverity = LogSeverity.warn,
	): ModuleWithProviders<LoggerModule> {
		return {
			ngModule: LoggerModule,
			providers: [
				{
					provide: ConsoleLoggerSeverityToken,
					useValue: consoleSeverity,
					multi: false,
				},

				{
					provide: LoggerProvider,
					useClass: ConsoleLoggerService,
					multi: true,
				},
			],
		};
	}

	static forTesting(
		consoleSeverity: LogSeverity = LogSeverity.warn,
		dbSeverity: LogSeverity = LogSeverity.warn,
	): ModuleWithProviders<LoggerModule> {
		return {
			ngModule: LoggerModule,
			providers: [
				{
					provide: ConsoleLoggerSeverityToken,
					useValue: consoleSeverity,
					multi: false,
				},

				{
					provide: DBLoggerSeverityToken,
					useValue: dbSeverity,
					multi: false,
				},

				{
					provide: LoggerProvider,
					useClass: ConsoleLoggerService,
					multi: true,
				},
				{
					provide: LoggerProvider,
					useClass: DbLoggerService,
					multi: true,
				},
			],
		};
	}

	static forProduction(
		consoleSeverity: LogSeverity = LogSeverity.warn,
		dbSeverity: LogSeverity = LogSeverity.warn,
		serverSeverity: LogSeverity = LogSeverity.warn,
	): ModuleWithProviders<LoggerModule> {
		return {
			ngModule: LoggerModule,
			providers: [
				{
					provide: ConsoleLoggerSeverityToken,
					useValue: consoleSeverity,
					multi: false,
				},

				{
					provide: DBLoggerSeverityToken,
					useValue: dbSeverity,
					multi: false,
				},
				{
					provide: ServerLoggerSeverityToken,
					useValue: serverSeverity,
					multi: false,
				},
				{
					provide: LoggerProvider,
					useClass: ConsoleLoggerService,
					multi: true,
				},
				{
					provide: LoggerProvider,
					useClass: ServerLoggerService,
					multi: true,
				},
				{
					provide: LoggerProvider,
					useClass: DbLoggerService,
					multi: true,
				},
			],
		};
	}

	static forAdaptive(
		consoleSeverity: LogSeverity = LogSeverity.warn,
		dbSeverity: LogSeverity = LogSeverity.warn,
		serverSeverity: LogSeverity = LogSeverity.warn,
	): ModuleWithProviders<LoggerModule> {
		if (IS_DEVMODE) return this.forDev(consoleSeverity);

		if (IS_TESTMODE) return this.forTesting(consoleSeverity, dbSeverity);

		return this.forProduction(consoleSeverity, dbSeverity, serverSeverity);
	}
}
