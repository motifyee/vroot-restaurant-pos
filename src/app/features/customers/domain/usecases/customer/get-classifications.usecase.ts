import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { CustomerRepo } from '@features';
import { Classification } from '../../models/classification.model';

export class GetClassificationsUseCase
	implements UseCase<undefined, Classification[]>
{
	customerRepo = inject(CustomerRepo);

	execute(): Observable<Classification[]> {
		return this.customerRepo.getClassifications();
	}
}

export const getClasificationsUseCaseProvider = {
	provide: GetClassificationsUseCase,
	useFactory: () => new GetClassificationsUseCase(),
};
