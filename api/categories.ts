interface Category {
	id: number;
	title: string;
	description?: string;
	color?: string;
	parentId?: string;
	imageUrl?: string;
	sn: number; //sort number
}

// interface FullCategory extends Category {
// 	products: Product[];
// }

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
	// getFullCategories: {
	// 	method: 'GET',
	// 	url: 'api/categories?full=true',
	// 	successCode: 200,
	// 	response: { data: [] as FullCategory[] },
	// },
	getCategories: {
		method: 'GET',
		url: 'api/categories',
		successCode: 200,
		response: { data: [] as Category[] },
	},
	// getCategoryProducts: {
	// 	method: 'GET',
	// 	url: 'api/categories/{id}/products',
	// 	successCode: 200,
	// 	response: { data: [] as Product[] },
	// },
	// getProducts: {
	// 	method: 'GET',
	// 	url: 'api/products',
	// 	successCode: 200,
	// 	response: { data: [] as Product[] },
	// },
	getVariants: {
		method: 'GET',
		url: 'api/products/variants',
		successCode: 200,
		response: { data: [] as ProductVariant[] },
	},
};
