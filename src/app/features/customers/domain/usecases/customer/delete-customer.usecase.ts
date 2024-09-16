import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { CustomerRepo } from '@features';

type Params = {
	customerId: string;
};

export class DeleteCustomerUseCase implements UseCase<Params, undefined> {
	customerRepo = inject(CustomerRepo);

	execute(params: Params): Observable<undefined> {
		return this.customerRepo.deleteById(params);
	}
}

export const deleteCustomerUseCaseProviderProvider = {
	provide: DeleteCustomerUseCase,
	useFactory: () => new DeleteCustomerUseCase(),
};
