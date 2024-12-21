declare interface WebstoreInvoice {
	id?: number;
	products: InvoiceProduct[];
	shippingAddressId: number;
	salesInvoiceType: number; // invoiceStatus: number; // delivery|takeaway|indoor
}
