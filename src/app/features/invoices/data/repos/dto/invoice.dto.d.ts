declare interface InvoiceDTO {
	id: number;
	invoiceType: number; //??? مبيعات 2 - مشتريات 1
	salesInvoiceType: number; // invoiceStatus: number; // delivery|takeaway|indoor
	isClosed: boolean; // status: number; // 1: not paid pending|2: paid = closed
	paymentType: number; // كاش - اجل

	customerId?: string;
	deliveryId?: string;
	waiterId?: string;

	companyDateFlag: number;
	branchDateFlag: number;

	employeeNote?: string;
	clientNote?: string;
	preparationNotes?: string;

	invoiceTax: number;
	invoiceDiscount: number;
	deliveryAreaPrice: number;
	deliveryCostPrice: number;

	servicePrice: number;

	toBranchId: number;
	tableNumber?: number;

	products: InvoiceProductDTO[];

	netPrice: number;
}
