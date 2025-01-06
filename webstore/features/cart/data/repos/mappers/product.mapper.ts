import { Mapper } from '@src/app/core';

export class CategoryProductMapper extends Mapper<Product, InvoiceProduct[]> {
	override mapFrom(param: Product): InvoiceProduct[] {
		return (
			param.variants?.map((v) => {
				const product: InvoiceProduct = {
					productVariantId: v.id,
					title: `${param.title} - ${v.title}`,
					price: v.price,
					additions: (<any>v).note ?? [],
					quantity: 0,
					totalPrice: 0,
				};

				return product;
			}) || []
		);
	}
	override mapTo(param: InvoiceProduct[]): Product {
		throw new Error('Method not implemented.');
	}
}
