import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UseCase } from '@src/app/features/base';
import { SettingsRepo } from '../repos/settings.repo';

export class GetCompanyInfoUseCase implements UseCase<void, Company> {
	repo = inject(SettingsRepo);

	execute(): Observable<Company> {
		let domain = window.location.hostname.replace(new RegExp('^www.'), '');

		if (domain === 'localhost')
			domain = localStorage.getItem('test-domain') ?? domain;

		return this.repo.getCompanyInfo({ domain });
	}
}

export const getCompanyInfoUseCaseProvider = {
	provide: GetCompanyInfoUseCase,
	useFactory: () => new GetCompanyInfoUseCase(),
};
