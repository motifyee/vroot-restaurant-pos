import { Observable } from 'rxjs';
import { UseCase } from '@src/app/features';
import { SettingsRepo } from '@webstore/features';
import { inject } from '@angular/core';

export class GetBranchesUseCase implements UseCase<void, Branch[]> {
	settingsRepo = inject(SettingsRepo);

	execute(config?: Config): Observable<Branch[]> {
		return this.settingsRepo.getBranches(config);
	}
}

export const GetBranchesUseCaseProvider = {
	provide: GetBranchesUseCase,
	useFactory: () => new GetBranchesUseCase(),
};
