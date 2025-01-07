// used in menu
declare interface InvoiceProduct {
	productVariantId: number;
	title: string;

	quantity: number;
	price: number;
	note?: string;

	totalPrice: number;
	additions?: GetAddition[];
}

// used to create invoice
declare interface CreateInvoiceProduct
	extends Pick<InvoiceProduct, 'productVariantId' | 'quantity' | 'note'> {
	additions?: CreateAddition[];
}
