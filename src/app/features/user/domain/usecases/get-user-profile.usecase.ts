import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { inject } from '@angular/core';
import { UserRepo } from '../repo/user.repo';
import { UseCase } from '@src/app/features/base';

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
