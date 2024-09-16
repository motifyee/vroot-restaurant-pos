interface Customer {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	mobile: string;
	classId: number;
}

interface Classification {
	id: number;
	name: string;
	color: string;
}

interface Address {
	id: number;
	address: string;
	isDefault: boolean;
}

export const api: API = {
	getCustomers: {
		method: 'GET',
		url: 'api/customers?q={}&phone={}&pageNumber={}&pageSize={}',
		successCode: 200,
		response: { data: [] as Customer[], pagination: {} as Pagination },
	},
	getCustomerById: {
		method: 'GET',
		url: 'api/customers/{id}',
		successCode: 200,
		response: { data: {} as Customer },
	},
	createCustomer: {
		method: 'POST',
		url: 'api/customers',
		payload: {} as Customer,
		successCode: 201,
		response: { data: {} as { id: string } },
	},
	updateCustomer: {
		method: 'PUT',
		url: 'api/customers/{id}',
		payload: {} as Customer,
		successCode: 204,
	},
	deleteCustomer: {
		method: 'DELETE',
		url: 'api/customers/{id}',
		successCode: 204,
	},
	// ###########################################################################
	getCustomerAddresses: {
		method: 'GET',
		url: 'api/customers/{id}/addresses',
		successCode: 200,
		response: {
			data: {} as Address,
		},
	},
	createCustomerAddress: {
		method: 'POST',
		url: 'api/customers/{id}/addresses',
		payload: {} as { address: string; isDefault: boolean },
		successCode: 201,
		response: { data: {} as { id: string } },
	},
	updateCustomerAddress: {
		method: 'PUT',
		url: 'api/customers/{id}/addresses',
		payload: {} as { address: string; isDefault: boolean },
		successCode: 204,
	},
	deleteCustomerAddress: {
		method: 'DELETE',
		url: 'api/customers/{id}/addresses/{addressId}',
		successCode: 204,
	},
	// ###########################################################################
	getCustomerClassifications: {
		method: 'GET',
		url: 'api/customers/classes',
		successCode: 200,
		response: { data: [] as Classification[] },
	},
};
