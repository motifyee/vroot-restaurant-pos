import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'webstore',
		pathMatch: 'full',
	},
	{
		path: 'pos',
		loadComponent: () =>
			import('./view/pages/pos/pos.component').then(
				(m) => m.POSComponent,
			),
	},
	{
		path: 'webstore',
		loadComponent: () =>
			import('./view/pages/webstore/webstore.component').then(
				(m) => m.WebstoreComponent,
			),
		loadChildren: () => [
			{
				path: '',
				loadComponent: () =>
					import(
						'./view/pages/webstore/pages/products/products-page.component'
					).then((m) => m.ProductsPageComponent),
			},
			{
				path: 'branches',
				loadComponent: () =>
					import(
						'./view/pages/webstore/components/topbar/order-type/pickup/pickup.component'
					).then((m) => m.PickupComponent),
			},
		],
	},
	{
		path: 'chat',
		loadComponent: () =>
			import('./view/pages/chat/chat.component').then(
				(m) => m.ChatComponent,
			),
		loadChildren: () => [
			{
				path: '',
				loadComponent: () =>
					import(
						'./view/pages/chat/pages/dashboard/dashboard.component'
					).then((m) => m.DashboardComponent),
			},
		],
	},
];
