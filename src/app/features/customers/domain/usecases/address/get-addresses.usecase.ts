import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { AddressRepo } from '@features';
import { Address } from '../../models';

type Params = {
	customerId: string;
};

export class GetAddressesUseCase implements UseCase<Params, Address[]> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<Address[]> {
		return this.addressRepo.getAddresses(params);
	}
}

export const getAddressesUseCaseProvider = {
	provide: GetAddressesUseCase,
	useFactory: () => new GetAddressesUseCase(),
};
