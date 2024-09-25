import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Customer, CustomerRepo, UseCase } from '@src/app/features';

export class UpdateCustomerUseCase implements UseCase<CustomerDTO, Customer> {
	customerRepo = inject(CustomerRepo);

	execute(params: CustomerDTO): Observable<Customer> {
		return this.customerRepo.update(params);
	}
}

export const updateCustomerUseCaseProvider = {
	provide: UpdateCustomerUseCase,
	useFactory: () => new UpdateCustomerUseCase(),
};
