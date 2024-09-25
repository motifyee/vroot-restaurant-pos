import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, UseCase } from '@src/app/features';
import { Customer } from '../../models/customer.model';

type Params = {
	query: string;
	phone: string;
	pageNumber: number;
	pageSize: number;
};

export class SearchCustomersUseCase implements UseCase<Params, Customer[]> {
	customerRepo = inject(CustomerRepo);

	execute(params: Params): Observable<Customer[]> {
		return this.customerRepo.search(params);
	}
}

export const searchCustomersUseCaseProvider = {
	provide: SearchCustomersUseCase,
	useFactory: () => new SearchCustomersUseCase(),
};
