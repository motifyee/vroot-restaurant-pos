interface DeliverArea {
	id: string;
	area: string;
	price: number;
	cost: number;
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
		response: { data: {} as { id: string } },
	},
	updateAreas: {
		method: 'PUT',
		url: 'api/delivery-areas',
		payload: {} as DeliverArea,
		successCode: 204,
	},
};
