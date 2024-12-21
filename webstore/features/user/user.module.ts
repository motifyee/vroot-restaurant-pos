import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRepo, UserImplRepo } from '@webstore/features';

@NgModule({
	imports: [CommonModule],
})
export class UserDataModule {
	static forRoot(): ModuleWithProviders<UserDataModule> {
		return {
			ngModule: UserDataModule,
			providers: [{ provide: UserRepo, useClass: UserImplRepo }],
		};
	}
}
