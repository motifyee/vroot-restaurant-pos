import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { webstoreConfig } from './config';

@Component({
	selector: 'root',
	standalone: true,
	imports: [RouterOutlet],
	template: `<router-outlet />`,
})
export class AppComponent {}

bootstrapApplication(AppComponent, webstoreConfig).catch((err) =>
	console.error(err),
);
