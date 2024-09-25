import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ShiftRepo } from '../repos/shift.repo';
import { UseCase } from '@src/app/features/base';

export class GetShiftUseCase implements UseCase<void, Shift> {
	repo = inject(ShiftRepo);

	execute(config?: Config): Observable<Shift> {
		return this.repo.getShift(config);
	}
}

export const GetShiftUseCaseProvider = {
	provide: GetShiftUseCase,
	useFactory: () => new GetShiftUseCase(),
};
