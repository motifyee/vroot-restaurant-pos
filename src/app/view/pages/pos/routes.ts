import { importProvidersFrom } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { FeaturesModule } from '@src/app/features';

export const posMainRoute: Route = {
	path: '',
	providers: [importProvidersFrom(FeaturesModule)],
	loadComponent: () => import('./pos.component').then((m) => m.POSComponent),
};

export const posRoutes: Routes = [posMainRoute];
