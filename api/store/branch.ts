interface Branch {
	id: number;
	title: string;
}

export const apis: API = {
	getStoreBranches: {
		method: 'GET',
		url: 'api/store/branches',
		headers: {} as { storeToken: string },
		successCode: 200,
		response: { data: [] as Branch[] },
		notes: 'no token required',
	},
};
