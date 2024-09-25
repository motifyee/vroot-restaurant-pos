import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CustomerRepo, UseCase } from '@src/app/features';

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
