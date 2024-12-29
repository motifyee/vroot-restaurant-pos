declare interface ProductVariant {
	id: number;
	title: string;
	price: number;
	additions: Addition[];
	product?: Product;
}
