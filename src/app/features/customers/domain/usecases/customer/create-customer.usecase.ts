import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, Customer, UseCase } from '@src/app/features';

export class CreateCustomerUseCase implements UseCase<CustomerDTO, Customer> {
	readonly customerRepo = inject(CustomerRepo);

	execute(params: CustomerDTO): Observable<Customer> {
		return this.customerRepo.create(params);
	}
}

export const createCustomerUseCaseProvider = {
	provide: CreateCustomerUseCase,
	useFactory: () => new CreateCustomerUseCase(),
};
