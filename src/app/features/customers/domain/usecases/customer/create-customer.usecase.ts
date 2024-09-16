import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, Customer, UseCase } from '@features';

export class CreateCustomerUseCase
	implements UseCase<CustomerEntity, Customer>
{
	readonly customerRepo = inject(CustomerRepo);

	execute(params: CustomerEntity): Observable<Customer> {
		return this.customerRepo.create(params);
	}
}

export const createCustomerUseCaseProvider = {
	provide: CreateCustomerUseCase,
	useFactory: () => new CreateCustomerUseCase(),
};
