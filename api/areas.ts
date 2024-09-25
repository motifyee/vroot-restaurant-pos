interface DeliverArea {
	id: string;
	area: string;
	price: decimal;
	cost: decimal;
}

export const apis: API = {
	getAreas: {
		method: 'GET',
		url: 'api/delivery-areas',
		successCode: 200,
		response: { data: {} as DeliverArea },
		notes: `better be paginated, but laid as such for simplicity`,
	},
	createAreas: {
		method: 'POST',
		url: 'api/delivery-areas',
		successCode: 201,
		payload: {} as DeliverArea,
		headers: {} as { creationToken: string },
		response: { data: {} as { id: string } },
	},
	updateAreas: {
		method: 'PUT',
		url: 'api/delivery-areas',
		payload: {} as DeliverArea,
		successCode: 204,
	},
};
