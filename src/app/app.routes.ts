import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'shop',
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
		path: 'shop',
		loadComponent: () =>
			import('./view/pages/webstore/webstore.component').then(
				(m) => m.ShopComponent,
			),
	},
];
