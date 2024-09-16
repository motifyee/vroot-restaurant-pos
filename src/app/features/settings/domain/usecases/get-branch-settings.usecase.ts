import { Observable } from 'rxjs';
import { UseCase, SettingsRepo } from '@features';
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
