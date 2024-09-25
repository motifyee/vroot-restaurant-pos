import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AddressRepo, UseCase } from '@src/app/features';

type Params = {
	customerId: string;
	address: Partial<AddressDTO>;
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
