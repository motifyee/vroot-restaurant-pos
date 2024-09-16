import { Host, Injectable, InjectionToken } from '@angular/core';
import {
	ConsoleLoggerSeverityToken,
	LoggerProvider,
	LogSeverity,
} from '../logger.model';
import { LoggerService } from '../logger.service';

@Injectable({
	providedIn: 'root',
})
export class ConsoleLoggerService extends LoggerProvider {
	public override token = ConsoleLoggerSeverityToken;

	public override info(...messages: any[]): void {
		if (messages[0] == LoggerService.WithHeaderSymbol) {
			messages[0] = `%c ${messages[1]} \n`;
			messages[1] = 'background: #3787e4; color: white';
		}
		this.onSeverity(
			LogSeverity.info,
			this.token,
			console.info,
			...messages,
		);
	}
	public override log(...messages: any[]): void {
		if (messages[0] == LoggerService.WithHeaderSymbol) {
			messages[0] = `%c ${messages[1]} \n`;
			messages[1] = 'background: #222; color: #bada55';
		}
		this.onSeverity(LogSeverity.log, this.token, console.log, ...messages);
	}
	public override warn(...messages: any[]): void {
		if (messages[0] == LoggerService.WithHeaderSymbol) {
			messages[0] = `%c ${messages[1]} \n`;
			messages[1] = 'background: #36301c; color: #bada55';
		}
		this.onSeverity(
			LogSeverity.warn,
			this.token,
			console.warn,
			...messages,
		);
	}
	public override error(...messages: any[]): void {
		if (messages[0] == LoggerService.WithHeaderSymbol) {
			messages[0] = `%c ${messages[1]} \n`;
			messages[1] = 'background: #3d2221; color: #bada55';
		}
		this.onSeverity(
			LogSeverity.error,
			this.token,
			console.error,
			...messages,
		);
	}
	public override _group(...messages: any[]): void {
		console.log(...messages);
	}
}
