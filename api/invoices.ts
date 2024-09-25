import { Buddy, Customer } from './buddies';

interface Invoice {
	id: number;
	creationToken: string; // r_code
	invoiceType: number; //??? مبيعات 2 - مشتريات 1
	salesInvoiceType: number; // invoiceStatus: number; // delivery|takeaway|indoor
	isClosed: boolean; // status: number; // 1: not paid pending|2: paid = closed
	paymentType: number; // كاش - اجل

	// customerId?: string;
	// deliveryId?: string;
	// waiterId?: string;
	customer: Customer;
	deliveryBoy: Buddy;
	waiter: Buddy;

	companyDateFlag: number;
	branchDateFlag: number;

	employeeNote?: string;
	clientNote?: string;
	preparationNotes?: string;

	finalPrice: decimal;
	invoiceDiscount: decimal;

	invoiceTax: decimal;

	deliveryAreaPrice: decimal;
	deliveryCostPrice: decimal;

	servicePrice: decimal;

	toBranchId: number;
	tableNumber?: number;

	products: InvoiceProducts[];
}
interface InvoiceProducts {
	productVariantId: number;
	quantity: number;
	price: decimal;
	totalPrice: decimal;
	note?: string;
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
		headers: {} as { creationToken: string },
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
