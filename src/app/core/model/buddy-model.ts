import { Base } from '../';

export class Buddy implements IBuddy {
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

export function getFullName(firstName: string, lastName?: string) {
	let first = firstName || '',
		last = lastName || '',
		sep = first && last ? ' ' : '';

	first &&
		(first = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase());
	last && (last = last.charAt(0).toUpperCase() + last.slice(1).toLowerCase());

	return `${first}${sep}${last}`;
}
