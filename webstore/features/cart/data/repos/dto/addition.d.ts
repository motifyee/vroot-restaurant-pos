declare interface Addition {
	id: string;
	name?: string;
	price?: number;

	with?: boolean;
	without?: boolean;

	quantity?: number;
	maxQuantity?: number;
	totalPrice?: number;
}
