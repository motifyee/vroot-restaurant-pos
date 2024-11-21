interface Branch {
	id: number;
	title: string;
}

export const apis: API = {
	getStoreBranches: {
		method: 'GET',
		url: 'api/store/{companyId}/branches',
		successCode: 200,
		response: { data: [] as Branch[] },
		notes: 'no token required',
	},
};
