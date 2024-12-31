import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '@src/app/features/base';
import { SettingsRepo } from '../repos/settings.repo';
import { IS_DEVMODE } from '@src/app/core';
import { GetCompanyDomainUseCase } from './get-company-domain.usecase';

export class GetCompanyInfoUseCase implements UseCase<void, Company> {
	repo = inject(SettingsRepo);
	domain = inject(GetCompanyDomainUseCase);

	execute(): Observable<Company> {
		let domain = this.domain.execute();

		if (IS_DEVMODE) {
			const company = localStorage.getItem('test-company');
			if (company) return of(JSON.parse(company));
		}

		return this.repo.getCompanyInfo({ domain });
	}
}

export const GetCompanyInfoUseCaseProvider = {
	provide: GetCompanyInfoUseCase,
	useFactory: () => new GetCompanyInfoUseCase(),
};
