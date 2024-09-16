declare interface Invoice {
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

	invoiceDetails: InvoiceDetail[];
}
