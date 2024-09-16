import { Base } from './base/base';

export class Branch implements IBranch {
	name: string | undefined;
	id: number | undefined;
	companyId: number | undefined;

	constructor(data: IBranch) {
		// this.mapProps(data);
	}
}
