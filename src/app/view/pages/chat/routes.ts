import { Route, Routes } from '@angular/router';

export const chatMainRoute: Route = {
	path: '',
	loadComponent: () =>
		import('./chat.component').then((m) => m.ChatComponent),
	loadChildren: () => [
		{
			path: '',
			loadComponent: () =>
				import('./pages/dashboard/dashboard.component').then(
					(m) => m.DashboardComponent,
				),
		},
	],
};

export const chatRoutes: Routes = [chatMainRoute];
