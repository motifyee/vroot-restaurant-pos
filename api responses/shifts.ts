export const apis: API = {
	getOpenShift: {
		method: 'GET',
		url: 'api/shifts',
		successCode: [200, 204],
		response: {
			data: {} as { id: number; startTime: string },
		},
	},
	openNewShift: {
		method: 'POST',
		url: 'api/shifts',
		successCode: 201,
		response: { data: {} as { id: number } },
	},
	closeShift: {
		method: 'PUT',
		url: 'api/shifts?close=true',
		successCode: 204,
		notes: `sum transaction flow`,
	},
};
