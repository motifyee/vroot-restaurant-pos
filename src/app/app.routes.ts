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
		loadChildren: () => [
			{
				path: '',
				loadComponent: () =>
					import('./view/pages/webstore/webstore.component').then(
						(m) => m.ShopComponent,
					),
			},
			{
				path: 'branches',
				loadComponent: () =>
					import(
						'./view/pages/webstore/components/order-options/pickup/pickup.component'
					).then((m) => m.PickupComponent),
			},
		],
	},
];
