import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '@src/app/features/base';
import { SettingsRepo } from '../repos/settings.repo';
import { IS_DEVMODE } from '@src/app/core';
import { useTestBranch, useTestCompany } from './util/use-test-company';

export class GetCompanyInfoUseCase implements UseCase<void, Company> {
	repo = inject(SettingsRepo);

	execute(): Observable<Company> {
		let domain = window.location.hostname.replace(new RegExp('^www.'), '');

		if (IS_DEVMODE) {
			domain = localStorage.getItem('test-domain') ?? domain;
			if (domain.includes('192.168.1.200'))
				domain = 'l-webstore-medanelsham.vroot.com';
			useTestCompany();
			useTestBranch();
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
