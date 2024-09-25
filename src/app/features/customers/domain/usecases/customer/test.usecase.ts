import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Customer, CustomerRepo, UseCase } from '@src/app/features';

export class TestUseCase implements UseCase<CustomerDTO, Customer> {
	customerRepo = inject(CustomerRepo);

	execute(): Observable<Customer> {
		return this.customerRepo.test();
	}
}

export const testUseCaseProvider = {
	provide: TestUseCase,
	useFactory: () => new TestUseCase(),
};
