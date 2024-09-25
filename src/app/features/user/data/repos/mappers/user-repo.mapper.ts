import { Mapper } from '@src/app/core';
import { User } from '../../../domain';

export class UserImplMapper extends Mapper<UserDTO, User> {
	mapFrom(param: UserDTO): User {
		return {
			id: param.id,
			fullName: param.name,
			username: param.userName,
			phoneNum: param.phoneNumber,
			profilePicture: param.userPicture,
			activationStatus: param.activationStatus,
		};
	}

	mapTo(param: User): UserDTO {
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
