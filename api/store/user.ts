interface User {
	id: string;
	name: string;
	username: string;
	phone: string;
	email: string;
	companyId: string; // the store registered in
	profilePicture: string;
	address: string;
	long: number;
	lat: number;
}

interface Address {
	id: number;
	address: string;
	isDefault: boolean;
}

export const apis: API = {
	signup: {
		method: 'POST',
		url: 'api/accounts/store/register',
		payload: {} as User,
		successCode: 201,
		response: { data: {} as { id: string } },
	},
	login: {
		method: 'POST',
		url: 'api/accounts/store/login',
		successCode: 200,
		payload: {} as { username: string; password: string },
		response: { data: {} as User },
	},
	// ###########################################################################
	getCustomerAddresses: {
		method: 'GET',
		url: 'api/store/customers/{id}/addresses',
		successCode: 200,
		response: {
			data: {} as Address,
		},
	},
	createCustomerAddress: {
		method: 'POST',
		url: 'api/store/customers/{id}/addresses',
		payload: {} as { address: string; isDefault: boolean },
		headers: {} as { creationToken: string },
		successCode: 201,
		response: { data: {} as { id: string } },
	},
	updateCustomerAddress: {
		method: 'PUT',
		url: 'api/store/customers/{id}/addresses',
		payload: {} as { address: string; isDefault: boolean },
		successCode: 204,
	},
	deleteCustomerAddress: {
		method: 'DELETE',
		url: 'api/store/customers/{id}/addresses/{addressId}',
		successCode: 204,
	},
};
