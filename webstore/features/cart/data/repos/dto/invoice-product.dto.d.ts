// used in menu
declare interface InvoiceProduct {
	productVariantId: number;
	title: string;

	quantity: number;
	price: number;
	note?: string;

	totalPrice: number;
	additions?: CartAddition[];
}

// used to create invoice
declare interface CreateInvoiceProduct
	extends Pick<InvoiceProduct, 'productVariantId' | 'quantity' | 'note'> {
	additions?: CreateInvoiceAddition[];
}

interface CreateUpdateInvoice {
	products: {
		productVariantId: number;
		quantity: number;

		additions?: Addition[];
	}[];

	shippingAddressId: number;
	salesInvoiceType: number;
	note?: string;

	toBranchId?: number;
	isUsualOrder: boolean;
	preparationStage?: null | 'preparing' | 'prepared' | 'delivered';
}

interface GetInvoice {
	id: number;
	products: {
		productVariantId: number;
		quantity: number;

		price: number;
		totalPrice: number;
		note: string;

		additions: {
			id: string;
			title: string;
			with: boolean;

			price: number;
			quantity: number;
			totalPrice: number;
		}[];
	}[];

	totalPrice: number;

	shippingAddressId: number;
	salesInvoiceType: number;
	note: string;

	toBranchId: number;
	isUsualOrder: boolean;
}
