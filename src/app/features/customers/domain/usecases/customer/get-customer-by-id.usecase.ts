import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, UseCase } from '@src/app/features';
import { Customer } from '../../models/customer.model';

type Params = {
	customerId: string;
};

export class GetCustomerUseCase implements UseCase<Params, Customer> {
	customerRepo = inject(CustomerRepo);

	execute(params: Params): Observable<Customer> {
		return this.customerRepo.getById(params);
	}
}

export const getCustomerUseCaseProvider = {
	provide: GetCustomerUseCase,
	useFactory: () => new GetCustomerUseCase(),
};
