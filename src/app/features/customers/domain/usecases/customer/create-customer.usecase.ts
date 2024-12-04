import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, Customer, UseCase } from '@src/app/features';

export class CreateCustomerUseCase
	implements UseCase<Partial<CustomerDTO>, Customer>
{
	readonly customerRepo = inject(CustomerRepo);

	execute(params: Partial<CustomerDTO>): Observable<Customer> {
		return this.customerRepo.create(params);
	}
}

export const createCustomerUseCaseProvider = {
	provide: CreateCustomerUseCase,
	useFactory: () => new CreateCustomerUseCase(),
};
