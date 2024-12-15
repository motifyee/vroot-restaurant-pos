import { Routes } from '@angular/router';
import { posMainRoute } from './view/pages/pos/routes';
import { webstoreMainRoute } from './view/pages/webstore/routes';
import { chatMainRoute } from './view/pages/chat/routes';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'webstore',
		pathMatch: 'full',
	},
	{ ...posMainRoute, path: 'pos' },
	{ ...webstoreMainRoute, path: 'webstore' },
	{ ...chatMainRoute, path: 'chat' },
];
