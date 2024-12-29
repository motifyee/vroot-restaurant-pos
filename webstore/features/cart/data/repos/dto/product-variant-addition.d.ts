declare interface ProductVariantAddition {
	id: string;
	name: string;
	price: number;
	with: boolean;
	without: boolean;

	isSelected?: boolean;
}
