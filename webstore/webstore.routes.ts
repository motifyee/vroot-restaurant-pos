import { importProvidersFrom } from '@angular/core';
import { Route, Routes } from '@angular/router';
import {
	invoiceStore,
	menuStore,
	settingsStore,
	userStore,
} from '@webstore/state';
import { WebstoreFeaturesModule } from './webstore.features.module';
import { checkoutPageGuard } from './guards/checkout.guard';

export const webstorePaths = {
	home: '',
	products: '',
	branches: 'branches',
	account: 'account',
	order: 'order',
	orders: 'orders',
	usuals: 'usuals',
	checkout: 'checkout',
	callUs: 'call-us',
};

// #############################################################################

export const webstoreMainRoute: Route = {
	path: '',
	// providers: [importProvidersFrom(WebstoreFeaturesModule)],
	loadComponent: () =>
		import('./webstore.component').then((m) => m.WebstoreComponent),
	providers: [
		userStore,
		settingsStore,
		menuStore,
		invoiceStore,
		importProvidersFrom(WebstoreFeaturesModule),
	],
	loadChildren: () => [
		{
			path: webstorePaths.products,
			loadComponent: () =>
				import('./pages/products/products-page.component').then(
					(m) => m.ProductsPageComponent,
				),
		},
		{
			path: webstorePaths.branches,
			loadComponent: () =>
				import(
					'./components/topbar/order-type/pickup/pickup.component'
				).then((m) => m.PickupComponent),
		},
		{
			path: webstorePaths.account,
			loadComponent: () =>
				import('./pages/account/account.component').then(
					(m) => m.AccountComponent,
				),
		},
		{
			path: webstorePaths.order,
			loadComponent: () =>
				import('./pages/order/order.component').then(
					(m) => m.OrderComponent,
				),
		},
		{
			path: webstorePaths.orders,
			loadComponent: () =>
				import('./pages/orders/orders.component').then(
					(m) => m.OrdersComponent,
				),
		},
		{
			path: webstorePaths.usuals,
			loadComponent: () =>
				import('./pages/usual-orders/usual-orders.component').then(
					(m) => m.UsualOrdersComponent,
				),
		},
		{
			path: webstorePaths.checkout,
			canActivate: [checkoutPageGuard()],
			loadComponent: () =>
				import('./pages/checkout/checkout.component').then(
					(m) => m.CheckoutComponent,
				),
		},
		{
			path: webstorePaths.callUs,
			loadComponent: () =>
				import('./pages/call-us/call-us.component').then(
					(m) => m.CallUsComponent,
				),
		},
	],
};

export const webstoreRoutes: Routes = [
	webstoreMainRoute,
	{
		// path for 404 page
		path: '**',
		redirectTo: '',
	},
];
