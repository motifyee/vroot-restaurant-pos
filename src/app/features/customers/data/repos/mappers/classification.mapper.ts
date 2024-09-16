import { Mapper } from '@core';
import { Customer } from '../../../models/customer.model';
import { Classification } from '../../../models/classification.model';
import { Address } from '../../../models/address.model';

export class ClassificationImplMapper extends Mapper<
	ClassificationEntity,
	Classification
> {
	override mapFrom(param: ClassificationEntity): Classification {
		return new Classification(param);
	}
	override mapTo(param: Classification): ClassificationEntity {
		return {
			id: param.id,
			color: param.color,
			name: param.name,
		};
	}
}
