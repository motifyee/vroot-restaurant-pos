interface Company {
	companyId: number;
	name: string;
	phone: string;
	mobile: string;
	email: string;
	address: string;
	photoUrl: string;
	description: string;
}

export const apis: API = {
	getCompanyInfo: {
		method: 'GET',
		url: 'api/companies/{id}',
		successCode: 200,
		response: { data: {} as Company },
	},
};
