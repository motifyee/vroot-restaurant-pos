interface GetInvoice {
	id: number;
	products: InvoiceProduct[];

	totalPrice: number;

	createdAt?: string;
	rating?: number;

	shippingAddressId?: number;
	salesInvoiceType: number;
	note: string;

	branchId: number;
	isUsualOrder: boolean;
	preparationStage?: null | 'preparing' | 'prepared' | 'delivered';
}

interface CreateInvoice
	extends Pick<
		GetInvoice,
		| 'shippingAddressId'
		| 'salesInvoiceType'
		| 'note'
		| 'branchId'
		| 'isUsualOrder'
	> {
	products: CreateInvoiceProduct[];
}

interface UpdateInvoice
	extends Pick<GetInvoice, 'id' | 'branchId' | 'rating' | 'preparationStage'>,
		CreateInvoice {}
