import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { Customer, CustomerRepo } from '@features';

export class TestUseCase implements UseCase<CustomerEntity, Customer> {
	customerRepo = inject(CustomerRepo);

	execute(): Observable<Customer> {
		return this.customerRepo.test();
	}
}

export const testUseCaseProvider = {
	provide: TestUseCase,
	useFactory: () => new TestUseCase(),
};
