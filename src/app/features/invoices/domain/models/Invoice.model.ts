import { Customer } from '@src/app/features/customers';
import { InvoiceProduct } from './invoice-product.model';

export type InvoiceType = 'sales' | 'purchase';
export type PaymentType = 'cash' | 'credit';
export type SalesInvoiceType = 'delivery' | 'takeaway' | 'indoor';

export function createInvoice({}) {
	return {
		invoiceType: 'sales',
		salesInvoiceType: 'delivery',
		isClosed: false,
		paymentType: 'cash',
		customer: undefined,
		delivery: undefined,
		waiter: undefined,
		invoiceTax: 0,
		invoiceDiscount: 0,
		deliveryAreaPrice: 0,
		deliveryCostPrice: 0,
		servicePrice: 0,
		toBranchId: 0,
		tableNumber: 0,
		products: [],
		netPrice: 0,
	};
}

export interface Invoice {
	id: number;
	date: Date;
	invoiceType: InvoiceType; //??? مبيعات 2 - مشتريات 1
	salesInvoiceType: SalesInvoiceType; // invoiceStatus: number; // delivery|takeaway|indoor
	isClosed: boolean; // status: number; // 1: not paid pending|2: paid = closed
	paymentType: PaymentType; // كاش - اجل

	customer?: Customer;
	delivery?: BuddyDTO;
	waiter?: BuddyDTO;

	CompanyDateFlag: number;
	branchDateFlag: number;

	employeeNote?: string;
	clientNote?: string;
	preparationNotes?: string;

	invoiceTax: number;
	invoiceDiscount: number;
	deliveryAreaPrice: number;
	deliveryCostPrice: number;

	servicePrice: number;

	toBranchId: number;
	tableNumber?: number;

	products: InvoiceProduct[];

	netPrice: number;
}
