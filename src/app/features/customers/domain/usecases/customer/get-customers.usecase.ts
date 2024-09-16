import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '../../../base/use-case';
import { CustomerRepo, Customer } from '@features';

type Params = {
	pageNumber: number;
	pageSize: number;
};

export class GetCustomersUseCase implements UseCase<Params, Customer[]> {
	customerRepo = inject(CustomerRepo);

	execute(params: Params): Observable<Customer[]> {
		return this.customerRepo.getAll(params);
	}
}

export const getCustomersUseCaseProvider = {
	provide: GetCustomersUseCase,
	useFactory: () => new GetCustomersUseCase(),
};
