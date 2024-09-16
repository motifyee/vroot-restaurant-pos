import { Observable } from 'rxjs';
import { UseCase } from '../../base/use-case';
import { User } from '../models/user.model';
import { UserRepo } from '../data/user.repo';
import { inject } from '@angular/core';

export class GetUserProfileUseCase implements UseCase<void, User> {
	userRepo = inject(UserRepo);

	execute(): Observable<User> {
		return this.userRepo.getUserProfile();
	}
}

export const getUserProfileUseCaseProvider = {
	provide: GetUserProfileUseCase,
	useFactory: () => new GetUserProfileUseCase(),
};
