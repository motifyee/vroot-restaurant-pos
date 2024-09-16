import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { inject } from '@angular/core';
import { AddressRepo } from '@features';
import { Address } from '../../models/address.model';

type Params = {
	customerId: string;
	address: AddressEntity;
};

export class CreateAddressUseCase implements UseCase<Params, Address> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<Address> {
		return this.addressRepo.createAddress(params);
	}
}

export const createAddressUseCaseProvider = {
	provide: CreateAddressUseCase,
	useFactory: () => new CreateAddressUseCase(),
};
