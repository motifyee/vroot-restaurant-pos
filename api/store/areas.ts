interface DeliverArea {
	id: string;
	area: string;
	price: decimal;
	cost: decimal;
}

export const apis: API = {
	getAreas: {
		method: 'GET',
		url: 'api/store/delivery-areas',
		successCode: 200,
		response: { data: [] as DeliverArea[] },
		notes: `better be paginated, but laid as such for simplicity`,
	},
};
