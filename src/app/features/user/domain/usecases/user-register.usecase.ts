import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { UserRepo } from '../repo/user.repo';
import { UseCase, User } from '@src/app/features';

export class UserRegisterUseCase
	implements UseCase<{ phoneNum: string; password: string }, User>
{
	userRepo = inject(UserRepo);

	execute(params: { phoneNum: string; password: string }): Observable<User> {
		return this.userRepo.register(params);
	}
}

export const userRegisterUseCaseProvider = {
	provide: UserRegisterUseCase,
	useFactory: () => new UserRegisterUseCase(),
};
