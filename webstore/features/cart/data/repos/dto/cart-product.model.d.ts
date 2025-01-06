declare interface CartVariant {
	variant: InvoiceProduct;

	quantity: number;
	totalPrice?: number;
	note?: string;

	additions?: Addition[];
}
