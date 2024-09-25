import { map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { SettingsRepo } from '@src/app/features';
import { ENV, HttpService } from '@src/app/core';

export class SettingsImplRepo implements SettingsRepo {
	http = inject(HttpService);

	getBranchSettings(config?: Config): Observable<BranchSettings> {
		return this.http
			.get<Response<BranchSettings>>(
				`${ENV.endpoint}/api/settings/branch`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}
}
