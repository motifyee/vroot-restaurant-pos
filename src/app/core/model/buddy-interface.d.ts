declare type SignupMethod = 'gmail' | 'facebook' | 'email' | 'apple';
declare type AccountStatus = 'active' | 'inactive';

declare interface IBuddy {
	guid: string;
	firstName: string;
	lastName?: string;

	email?: string;
	password?: string;
	signupMethod?: SignupMethod;
	registerationDate?: Date;

	mobile?: string;
	countryId?: number;
	status?: boolean;
}
