import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./view/pages/pos/pos.component').then(
				(m) => m.POSComponent,
			),
	},
	{
		path: 'store',
		loadComponent: () =>
			import('./view/pages/store/store.component').then(
				(m) => m.StoreComponent,
			),
	},
	{
		path: 'shop',
		loadComponent: () =>
			import('./view/pages/shop/shop.component').then(
				(m) => m.ShopComponent,
			),
	},
];
