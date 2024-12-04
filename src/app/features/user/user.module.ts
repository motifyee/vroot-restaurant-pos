import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	UserRepo,
	UserImplRepo,
	userLoginUseCaseProvider,
	getUserProfileUseCaseProvider,
	userRegisterUseCaseProvider,
} from '@src/app/features';

@NgModule({
	providers: [
		userLoginUseCaseProvider,
		userRegisterUseCaseProvider,
		getUserProfileUseCaseProvider,
	],
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
