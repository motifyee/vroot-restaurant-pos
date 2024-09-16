import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	UserRepo,
	UserImplRepo,
	userLoginUseCaseProvider,
	getUserProfileUseCaseProvider,
	userRegisterUseCaseProvider,
} from '@features';

@NgModule({
	providers: [
		userLoginUseCaseProvider,
		userRegisterUseCaseProvider,
		getUserProfileUseCaseProvider,
		{ provide: UserRepo, useClass: UserImplRepo },
	],
	imports: [CommonModule],
})
export class UserDataModule {}
