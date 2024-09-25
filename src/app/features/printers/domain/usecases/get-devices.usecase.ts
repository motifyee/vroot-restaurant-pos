import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, PrintersRepo } from '@src/app/features';

export class GetPOSDevicesUseCase implements UseCase<void, PosDevice[]> {
	readonly printersRepo = inject(PrintersRepo);

	execute(config?: Config): Observable<PosDevice[]> {
		return this.printersRepo.getPosDevices(config);
	}
}

export const getPosDevicesUseCaseProvider = {
	provide: GetPOSDevicesUseCase,
	useFactory: () => new GetPOSDevicesUseCase(),
};
