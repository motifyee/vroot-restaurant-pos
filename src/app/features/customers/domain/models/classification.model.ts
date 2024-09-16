import { Base } from '@core';

export class Classification implements ClassificationEntity {
	id: number;
	name: string;
	color: string;

	constructor(param: ClassificationEntity) {
		this.id = param.id;
		this.name = param.name;
		this.color = param.color;
	}
}
