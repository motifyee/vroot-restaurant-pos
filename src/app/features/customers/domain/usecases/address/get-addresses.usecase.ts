import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AddressRepo, UseCase } from '@src/app/features';

type Params = {
	customerId: string;
};

export class GetAddressesUseCase implements UseCase<Params, AddressDTO[]> {
	addressRepo = inject(AddressRepo);

	execute(params: Params): Observable<AddressDTO[]> {
		return this.addressRepo.getAddresses(params);
	}
}

export const getAddressesUseCaseProvider = {
	provide: GetAddressesUseCase,
	useFactory: () => new GetAddressesUseCase(),
};
