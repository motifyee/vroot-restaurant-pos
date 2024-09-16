import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { User } from '../models/user.model';
import { UserRepo } from '../data/user.repo';
import { inject } from '@angular/core';
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
