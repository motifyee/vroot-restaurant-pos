declare interface CategoryDTO {
	id: number;
	title: string;
	description?: string;
	color?: string;
	parentId?: string;
	imageUrl?: string;
	sn: number; //sort number
	products: Product[];
}

declare interface Category {
	id: number;
	title: string;
	description?: string;
	color?: string;
	parentId?: string;
	imageUrl?: string;
	sn: number; //sort number
	products: InvoiceProduct[];
}
