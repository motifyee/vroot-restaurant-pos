import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { chatConfig } from './chat.config';

@Component({
	selector: 'root',
	standalone: true,
	imports: [RouterOutlet],
	template: `<router-outlet />`,
})
export class AppComponent {}

bootstrapApplication(AppComponent, chatConfig).catch((err) =>
	console.error(err),
);
