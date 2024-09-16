import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

export const authnGuard: CanActivateFn = (route, state) => {
	console.log(state.url);
	if (localStorage.getItem('token')) return true;

	let redirect = ['', '/'].includes(state.url)
		? ''
		: `redirect=${encodeURI(state.url)}`;
	return inject(Router).navigateByUrl(`/login`);
};

export const adminGuard: CanActivateChildFn = (route, state) => {
	return authnGuard(route, state);
};

export const authzGuard: CanActivateChildFn = (route, state) => {
	return authnGuard(route, state);
};

export const loginPageGuard: CanActivateFn = (route, state) => {
	if (!localStorage.getItem('token')) return true;

	// TODO redirect passed parameter
	return inject(Router).navigateByUrl('/');
};

// return inject(Router).navigateByUrl(state.url.substring(1));
export const anyGuard: CanActivateFn = (route, state) => {
	debugger;
	return authnGuard(route, state);
};
