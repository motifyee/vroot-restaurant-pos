import { Observable, of } from 'rxjs';
import { UseCase } from '@src/app/features';
import { Invoice } from '../models/Invoice.model';

export class CalcInvoicePricesUseCase
	implements UseCase<{ invoice: Invoice }, Invoice>
{
	execute(params: { invoice: Invoice }): Observable<Invoice> {
		let invoice = params.invoice;

		let productsTotal = invoice.products.reduce(
			(total, product) => total + product.totalPrice,
			0,
		);

		let costWithServices =
			productsTotal +
			(invoice.servicePrice ?? 0) +
			(invoice.deliveryCostPrice ?? 0);

		let costAfterDiscount =
			costWithServices - (invoice.invoiceDiscount ?? 0);

		invoice.invoiceTax = (costAfterDiscount ?? 0) * 0.15;

		invoice.netPrice =
			costAfterDiscount +
			invoice.invoiceTax -
			(invoice.invoiceDiscount ?? 0);

		return of(invoice);
	}
}

export const calcInvoicePricesUseCaseProvider = {
	provide: CalcInvoicePricesUseCase,
	useFactory: () => new CalcInvoicePricesUseCase(),
};
