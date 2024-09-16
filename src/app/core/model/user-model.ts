import { Base } from './base/base';
import { getFullName } from './buddy-model';

export class User implements IBuddy {
	guid = '';
	firstName = '';
	lastName?: string | undefined;

	email?: string;
	password?: string;
	signupMethod?: SignupMethod | undefined;
	registerationDate?: Date | undefined;

	mobile?: string | undefined;
	countryId?: number | undefined;
	status?: boolean | undefined;

	get fullName() {
		return getFullName(this.firstName, this.lastName);
	}

	constructor(buddy: Partial<IBuddy>) {
		// this.mapProps(buddy);
	}
}

export class UserData implements IUserData {
	token = '';

	branchId = 0;
	companyId = 0;
	employeeId = 0;

	userType = '';
	userId = 0;

	constructor(user: IUserData) {
		// this.mapProps(user);
	}
	guid = '';
	firstName = '';
	lastName?: string | undefined;
	email?: string | undefined;
	password?: string | undefined;
	signupMethod?: any;
	registerationDate?: Date | undefined;
	mobile?: string | undefined;
	countryId?: number | undefined;
	status?: any;
}
