import { AbstractControl } from '@angular/forms';
import {
	CapitalLetterPattern,
	LengthOf8Pattern,
	LowerLetterPattern,
	NumberPattern,
	SpecialCarachterPattern,
} from '../constants/constants';

export const passwordInputValidators = (
	control?: AbstractControl | null,
	validClass?: string,
	invalidClass?: string,
) => {
	const isValid = (
		control: AbstractControl | null | undefined,
		pattern: RegExp,
	) => {
		let dirty = control?.dirty,
			valid =
				dirty && !!(control?.value as unknown as string).match(pattern);

		if (!dirty) return undefined;
		return valid;
	};

	const classOf = (valid: boolean | undefined) => {
		if (typeof valid === 'undefined') return '';
		return valid ? validClass ?? valid : invalidClass ?? valid;
	};

	return [
		() => classOf(isValid(control, LowerLetterPattern)),
		() => classOf(isValid(control, CapitalLetterPattern)),
		() => classOf(isValid(control, NumberPattern)),
		() => classOf(isValid(control, SpecialCarachterPattern)),
		() => classOf(isValid(control, LengthOf8Pattern)),
	];
};
