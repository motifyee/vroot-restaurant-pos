import { Observable } from 'rxjs';
import { UseCase } from '../../../../../base';
import { inject } from '@angular/core';
import { ShiftRepo } from '../repos';

export class OpenShiftUseCase implements UseCase<void, void> {
	repo = inject(ShiftRepo);

	execute(config?: Config): Observable<void> {
		return this.repo.openShift(config);
	}
}

export const OpenShiftUseCaseProvider = {
	provide: OpenShiftUseCase,
	useFactory: () => new OpenShiftUseCase(),
};
