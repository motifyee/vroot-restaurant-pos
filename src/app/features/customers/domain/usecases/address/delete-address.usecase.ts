import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { AddressRepo } from '@features';

type Params = {
	customerId: string;
	addressId: string;
};

export class DeleteAddressUseCase implements UseCase<Params, undefined> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<undefined> {
		return this.addressRepo.deleteAddress(params);
	}
}

export const deleteAddressUseCaseProvider = {
	provide: DeleteAddressUseCase,
	useFactory: () => new DeleteAddressUseCase(),
};
