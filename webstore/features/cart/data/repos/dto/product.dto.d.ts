declare interface Product {
	id: string;
	categoryId: number;
	sn: number;
	title: string;
	variants?: ProductVariant[];
}
