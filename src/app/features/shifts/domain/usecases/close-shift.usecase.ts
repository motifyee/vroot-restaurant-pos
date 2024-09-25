import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ShiftRepo } from '../repos/shift.repo';
import { UseCase } from '@src/app/features/base';

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
