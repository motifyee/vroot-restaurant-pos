import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, UseCase } from '@src/app/features';

export class GetClassificationsUseCase
	implements UseCase<undefined, ClassificationDTO[]>
{
	customerRepo = inject(CustomerRepo);

	execute(): Observable<ClassificationDTO[]> {
		return this.customerRepo.getClassifications();
	}
}

export const getClasificationsUseCaseProvider = {
	provide: GetClassificationsUseCase,
	useFactory: () => new GetClassificationsUseCase(),
};
