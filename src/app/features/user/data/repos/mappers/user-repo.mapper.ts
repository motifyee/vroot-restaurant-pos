import { Mapper } from '@core';
import { User } from '../../../models/user.model';

export class UserImplMapper extends Mapper<UserEntity, User> {
	mapFrom(param: UserEntity): User {
		return {
			id: param.id,
			fullName: param.name,
			username: param.userName,
			phoneNum: param.phoneNumber,
			profilePicture: param.userPicture,
			activationStatus: param.activationStatus,
		};
	}

	mapTo(param: User): UserEntity {
		return {
			id: param.id,
			name: param.fullName,
			userName: param.username,
			phoneNumber: param.phoneNum,
			userPicture: param.profilePicture,
			activationStatus: param.activationStatus,
		};
	}
}
