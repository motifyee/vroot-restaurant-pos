import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { AddressRepo } from '@features';

type Params = {
	customerId: string;
	address: Partial<AddressEntity>;
};

export class UpdateAddressUseCase implements UseCase<Params, undefined> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<undefined> {
		return this.addressRepo.updateAddress(params);
	}
}

export const updateAddressUseCaseProvider = {
	provide: UpdateAddressUseCase,
	useFactory: () => new UpdateAddressUseCase(),
};
