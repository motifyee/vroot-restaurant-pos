import { Base } from './base/base';

export class Company implements ICompany {
	name?: string;
	id?: number;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;

	constructor(data: ICompany) {
		// this.mapProps(data);
	}
}
