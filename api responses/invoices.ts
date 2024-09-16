interface Invoice {
	id: number;
	invoiceType: number; //??? مبيعات 2 - مشتريات 1
	salesInvoiceType: number; // invoiceStatus: number; // delivery|takeaway|indoor
	isClosed: boolean; // status: number; // 1: not paid pending|2: paid = closed
	paymentType: number; // كاش - اجل

	customerId?: string;
	deliveryId?: string;
	waiterId?: string;

	// flagByDateCompany: 11;
	flagByDateBranch: number;

	employeeNote?: string;
	clientNote?: string;
	preparationNotes?: string;

	finalPrice: number;

	totalPrice: number;

	invoiceTax: number;
	invoiceDiscount: number;
	deliveryAreaPrice: number;
	deliveryCostPrice: number;

	servicePrice: number;

	toBranchId: number;
	tableNumber?: number;

	invoiceDetails: [
		{
			productVariantId: number;
			quantity: number;
			totalPrice: number;
			note?: string;
		},
	];
}

export const apis: API = {
	getInvoices: {
		method: 'GET',
		url: 'api/invoices?from={}&to={}&pageNumber={}&pageSize={}&fromBranch={}&toBranch{}&deliveryId{}&isClosed={}',
		successCode: 200,
		response: { data: [] as Invoice[] },
	},
	getInvoice: {
		method: 'GET',
		url: 'api/invoices/{id}',
		successCode: 200,
		response: { data: {} as Invoice },
	},
	createInvoice: {
		method: 'POST',
		url: 'api/invoices',
		payload: {} as Invoice,
		successCode: 201,
		response: { data: {} as { id: number } },
	},
	updateInvoice: {
		method: 'PUT',
		url: 'api/invoices/{id}',
		payload: {} as Invoice,
		successCode: 204,
	},
	deleteInvoice: {
		method: 'PUT',
		url: 'api/invoices/{id}',
		successCode: 204,
	},
};
