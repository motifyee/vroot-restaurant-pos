declare interface Addition {
	id: string;
	name: string;
	price: number;

	with: boolean;
	without: boolean;

	maxQuantity?: number;
}

// used inside cart || retrieved inside invoice
declare interface CartAddition extends Addition {
	quantity: number;
	totalPrice: number;
}

declare interface CreateInvoiceAddition {
	id: string;
	with: boolean;
	quantity: number;
}
