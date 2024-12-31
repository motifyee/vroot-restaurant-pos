import { SyncUseCase } from '@src/app/features/base';
import { IS_DEVMODE } from '@src/app/core';
import { useTestBranch, useTestCompany } from './util/use-test-company';

export class GetCompanyDomainUseCase implements SyncUseCase<void, string> {
	execute(): string {
		let domain = window.location.hostname.replace(new RegExp('^www.'), '');

		if (IS_DEVMODE) {
			domain = localStorage.getItem('test-domain') ?? domain;

			if (domain.includes('192.168.1.200'))
				domain = 'l-webstore-medanelsham.vroot.com';

			useTestCompany();
			useTestBranch();
		}

		return domain;
	}
}

export const GetCompanyDomainUseCaseProvider = {
	provide: GetCompanyDomainUseCase,
	useFactory: () => new GetCompanyDomainUseCase(),
};
