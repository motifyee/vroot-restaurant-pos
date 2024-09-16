import { Observable } from 'rxjs';
import { UseCase } from '../../../../../base';
import { inject } from '@angular/core';
import { ShiftRepo } from '../repos';

export class CloseShiftUseCase implements UseCase<void, void> {
	repo = inject(ShiftRepo);

	execute(config?: Config): Observable<void> {
		return this.repo.closeShift(config);
	}
}

export const CloseShiftUseCaseProvider = {
	provide: CloseShiftUseCase,
	useFactory: () => new CloseShiftUseCase(),
};
