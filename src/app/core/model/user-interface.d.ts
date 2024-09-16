/* eslint-disable no-unused-vars */

declare interface IBuddyLoginData extends IBuddy {
	password: string;
}

declare interface IUserData extends IBuddy {
	token: string;

	branchId: number;
	companyId: number;
	employeeId: number;

	userType: string;
	userId: number;
}

declare interface IUserActions {
	register: (email: string, pwd: string, opt: Config) => void;
	login: (email: string, pwd: string, opt: Config) => void;
	logout: (opt: Config) => void;
	getUser: (opt: Config) => void;
	updateUser: (user: User, opt: Config) => void;
	deleteUser: (opt: Config) => void;
	getUserSettings: (opt: Config) => void;
	updateUserSettings: (settings: IUserSettings, opt: Config) => void;
}

declare interface IUserPermissions {
	canView: boolean;
	canEdit: boolean;
	canDelete: boolean;
	canCreate: boolean;
}

declare interface IUserSettings {
	theme: string;
	language: string;
	timezone: string;
}

declare interface IUserPreferences {
	notifications: boolean;
	otp: boolean;
	whatsapp: boolean;
}

declare interface IUserStore
	extends IBuddyLoginData,
		IUserActions,
		IUserPermissions,
		IUserSettings,
		IUserPreferences {
	isLoggedIn: boolean;
}

declare interface ILoginInfo {
	token: string;
	user: IBuddy;
	branchId: number;
	companyId: number;
	employeeId: number;
	branchName: string;
}
