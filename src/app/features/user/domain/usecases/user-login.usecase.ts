import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { UserRepo } from '../repo/user.repo';
import { UseCase } from '@src/app/features/base';
export class UserLoginUseCase
	implements UseCase<{ username: string; password: string }, User>
{
	userRepo = inject(UserRepo);

	execute(params: { username: string; password: string }): Observable<User> {
		return this.userRepo.login(params);
	}
}

export const userLoginUseCaseProvider = {
	provide: UserLoginUseCase,
	useFactory: () => new UserLoginUseCase(),
};
