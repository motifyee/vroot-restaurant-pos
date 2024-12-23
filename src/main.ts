import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'root',
    imports: [RouterOutlet],
    template: `<router-outlet />`
})
export class AppComponent {}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
	console.error(err),
);
