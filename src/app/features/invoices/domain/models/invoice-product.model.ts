export interface InvoiceProduct {
	id: number;
	productVariant: ProductVariant;
	quantity: number;
	price: number;
	totalPrice: number;
	note?: string;
}
