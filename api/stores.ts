interface Store {
	name: string;
	storeId: number;
}

export const apis: API = {
	getBranchStores: {
		method: 'GET',
		url: 'api/stores?branchId={}',
		successCode: 200,
		response: { data: [] as Store[] },
	},
};
