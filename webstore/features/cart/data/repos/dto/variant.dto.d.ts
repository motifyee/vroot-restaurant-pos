declare interface ProductVariant {
	id: number;
	title: string;
	price: number;
	note?: string;
	product?: Product;
}
