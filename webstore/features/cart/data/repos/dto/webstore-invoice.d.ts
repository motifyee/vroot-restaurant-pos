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
	toBranchId: number;
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
		| 'toBranchId'
		| 'isUsualOrder'
	> {
	products: CreateInvoiceProduct[];
}

interface UpdateInvoice
	extends Pick<GetInvoice, 'id' | 'rating' | 'preparationStage'>,
		CreateInvoice {}
