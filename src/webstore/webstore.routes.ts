import { importProvidersFrom } from '@angular/core';
import { Route, Routes } from '@angular/router';
import {
	cartStore,
	invoiceStore,
	menuStore,
	settingsStore,
	userStore,
} from '@webstore/state';
import { WebstoreFeaturesModule } from '@src/webstore/webstore.features.module';

export const webstoreMainRoute: Route = {
	path: '',
	// providers: [importProvidersFrom(WebstoreFeaturesModule)],
	loadComponent: () =>
		import('./webstore.component').then((m) => m.WebstoreComponent),
	providers: [
		userStore,
		cartStore,
		settingsStore,
		menuStore,
		invoiceStore,
		importProvidersFrom(WebstoreFeaturesModule),
	],
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
