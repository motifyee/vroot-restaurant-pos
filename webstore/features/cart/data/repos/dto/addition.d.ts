declare interface Addition {
	id: string;
	name: string;
	price: number;

	with: boolean;
	without: boolean;

	maxQuantity?: number;
}

// used inside cart || retrieved inside invoice
declare interface GetAddition extends Addition {
	quantity: number;
	totalPrice: number;
}

declare interface CreateAddition {
	id: string;
	with: boolean;
	quantity: number;
}
