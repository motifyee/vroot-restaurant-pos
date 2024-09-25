import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, Customer, UseCase } from '@src/app/features';

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
