import { Routes } from '@angular/router';
import { posMainRoute } from './app/view/pages/pos/routes';
import { webstoreMainRoute } from './webstore/webstore.routes';
import { chatMainRoute } from './app/view/pages/chat/routes';

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
