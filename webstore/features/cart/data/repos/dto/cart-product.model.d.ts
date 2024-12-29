declare interface CartVariant {
	variant: ProductVariant;

	quantity: number;
	totalPrice?: number;
	note?: string;

	additions?: Addition[];
}

// Creation API
declare interface CreateCartVariant {
	productvariantid: number;

	quantity: number;
	note?: string;

	additions?: Addition[];
}
