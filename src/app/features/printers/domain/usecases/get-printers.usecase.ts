import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase, PrintersRepo } from '@features';

export class GetPrintersUseCase
	implements UseCase<{ deviceId: string }, Printer[]>
{
	readonly printersRepo = inject(PrintersRepo);

	execute(
		params: { deviceId: string },
		config?: Config,
	): Observable<Printer[]> {
		return this.printersRepo.getPrinters(params, config);
	}
}

export const getPrintersUseCaseProvider = {
	provide: GetPrintersUseCase,
	useFactory: () => new GetPrintersUseCase(),
};
