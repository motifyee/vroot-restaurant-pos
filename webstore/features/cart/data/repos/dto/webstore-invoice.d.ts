declare interface WebstoreInvoice {
	id?: number;
	products: InvoiceProduct[];
	shippingAddressId: number;
	salesInvoiceType: number; // invoiceStatus: number; // delivery|takeaway|indoor
	note?: string;

	totalPrice?: number;

	toBranchId?: number;
	isUsualOrder: boolean;

	createdAt?: string;
	rating?: number;
}
