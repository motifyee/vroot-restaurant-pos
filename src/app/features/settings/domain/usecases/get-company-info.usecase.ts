import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '@src/app/features/base';
import { SettingsRepo } from '../repos/settings.repo';
import { IS_DEVMODE } from '@src/app/core';
import { useTestCompany } from './util/use-test-company';

export class GetCompanyInfoUseCase implements UseCase<void, Company> {
	repo = inject(SettingsRepo);

	execute(): Observable<Company> {
		let domain = window.location.hostname.replace(new RegExp('^www.'), '');

		if (IS_DEVMODE) {
			domain = localStorage.getItem('test-domain') ?? domain;

			useTestCompany();
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
