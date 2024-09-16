import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { Customer, CustomerRepo } from '@features';

export class UpdateCustomerUseCase
	implements UseCase<CustomerEntity, Customer>
{
	customerRepo = inject(CustomerRepo);

	execute(params: CustomerEntity): Observable<Customer> {
		return this.customerRepo.update(params);
	}
}

export const updateCustomerUseCaseProvider = {
	provide: UpdateCustomerUseCase,
	useFactory: () => new UpdateCustomerUseCase(),
};
