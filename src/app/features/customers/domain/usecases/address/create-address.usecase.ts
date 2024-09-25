import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AddressRepo, UseCase } from '@src/app/features';

type Params = {
	customerId: string;
	address: AddressDTO;
};

export class CreateAddressUseCase implements UseCase<Params, AddressDTO> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<AddressDTO> {
		return this.addressRepo.createAddress(params);
	}
}

export const createAddressUseCaseProvider = {
	provide: CreateAddressUseCase,
	useFactory: () => new CreateAddressUseCase(),
};
