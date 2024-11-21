interface Category {
	id: number;
	title: string;
	description?: string;
	color?: string;
	parentId?: string;
	imageUrl?: string;
	sn: number; //sort number
}

interface FullCategory extends Category {
	products: Product[];
}

interface Product {
	id: string;
	categoryId: number;
	sn: number;
	title: string;
	variants?: ProductVariant[];
}

interface ProductVariant {
	id: number;
	title: string;
	price: decimal;
	note?: string;
	product?: Product;
}

export const apis: API = {
	getMenu: {
		method: 'GET',
		url: 'api/store/{companyId}/menu',
		successCode: 200,
		response: { data: [] as FullCategory[] },
		notes: `no token required`,
	},
};
