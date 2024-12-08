import { Route, Routes } from '@angular/router';

export const webstoreMainRoute: Route = {
	path: '',
	// providers: [importProvidersFrom(WebstoreFeaturesModule)],
	loadComponent: () =>
		import('./webstore.component').then((m) => m.WebstoreComponent),
	loadChildren: () => [
		{
			path: '',
			loadComponent: () =>
				import('./pages/products/products-page.component').then(
					(m) => m.ProductsPageComponent,
				),
		},
		{
			path: 'branches',
			loadComponent: () =>
				import(
					'./components/topbar/order-type/pickup/pickup.component'
				).then((m) => m.PickupComponent),
		},
	],
};

export const webstoreRoutes: Routes = [webstoreMainRoute];
