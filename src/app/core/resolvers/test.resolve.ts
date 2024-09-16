import { ResolveFn } from '@angular/router';

export const testResolver: ResolveFn<string> = (route, state) => {
	return `test data on route: ${route.paramMap.get('t')}`;
};
