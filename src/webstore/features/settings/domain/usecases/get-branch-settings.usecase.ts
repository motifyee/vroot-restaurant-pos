import { Observable } from 'rxjs';
import { UseCase } from '@src/app/features';
import { SettingsRepo } from '@webstore/features';
import { inject } from '@angular/core';

export class GetBranchSettingsUseCase implements UseCase<void, BranchSettings> {
	settingsRepo = inject(SettingsRepo);

	execute(config?: Config): Observable<BranchSettings> {
		return this.settingsRepo.getBranchSettings(config);
	}
}

export const GetBranchSettingsUseCaseProvider = {
	provide: GetBranchSettingsUseCase,
	useFactory: () => new GetBranchSettingsUseCase(),
};
