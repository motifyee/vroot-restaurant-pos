export const APP_MENU = Symbol('APP_MENU');

export const PasswordPattern: RegExp =
	/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
export const CapitalLetterPattern = /^(?=.*[A-Z])/;
export const LowerLetterPattern = /(?=.*[a-z])/;
export const NumberPattern = /(.*[0-9].*)/;
export const SpecialCarachterPattern = /(?=.*[!@#$%^&*])/;
export const LengthOf8Pattern = /.{8,}/;
