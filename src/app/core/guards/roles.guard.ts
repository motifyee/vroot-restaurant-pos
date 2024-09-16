import { CanActivateChildFn } from '@angular/router';

export const rolesGuard: CanActivateChildFn = (childRoute, state) => {
	return true;
};
