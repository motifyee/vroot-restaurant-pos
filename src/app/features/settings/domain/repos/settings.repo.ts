import { Observable } from 'rxjs';

export abstract class SettingsRepo {
	abstract getBranchSettings(config?: Config): Observable<BranchSettings>;
	abstract getBranches(config?: Config): Observable<Branch[]>;
}
