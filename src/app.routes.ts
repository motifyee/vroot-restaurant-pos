import { Routes } from '@angular/router';
import { posMainRoute } from './app/view/pages/pos/routes';
import { chatMainRoute } from './app/view/pages/chat/routes';
import { webstoreMainRoute } from '@webstore/webstore.routes';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'chat',
		pathMatch: 'full',
	},
	{ ...posMainRoute, path: 'pos' },
	{ ...webstoreMainRoute, path: 'webstore' },
	{ ...chatMainRoute, path: 'chat' },
];
