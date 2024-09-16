import { map, Observable } from 'rxjs';
import { ENV, HttpService } from '@core';
import { inject } from '@angular/core';
import { SettingsRepo } from '@features';

export class SettingsImplRepo implements SettingsRepo {
	#http = inject(HttpService);

	getBranchSettings(config?: Config): Observable<BranchSettings> {
		return this.#http
			.get<Response<BranchSettings>>(
				`${ENV.endpoint}/api/settings/branch`,
				undefined,
				config,
			)
			.pipe(map((res) => res.data!));
	}
}
