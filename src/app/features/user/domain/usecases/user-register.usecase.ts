import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UseCase } from '../../base/use-case';
import { UserRepo } from '../data/user.repo';
import { inject } from '@angular/core';

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
