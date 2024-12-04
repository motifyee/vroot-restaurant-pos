import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SettingsRepo } from '@src/app/features';
import { ENV, HttpService } from '@src/app/core';

export class SettingsImplRepo implements SettingsRepo {
	http = inject(HttpService);

	getBranchSettings(config?: Config): Observable<BranchSettings> {
		return this.http
			.get<
				Response<BranchSettings>
			>(`${ENV.endpoint}/api/settings/branch`, undefined, config)
			.pipe(map((res) => res.data!));
	}

	getBranches(config?: Config): Observable<Branch[]> {
		return this.http.get<Branch[]>(
			`${ENV.endpoint}/api/store/10/branches`,
			undefined,
			config,
		);
	}

	getCompanyInfo(params: { domain: string }): Observable<Company> {
		return this.http.get<Company>(
			`${ENV.endpoint}/api/companies?domain=${params.domain}`,
		);
	}
}
