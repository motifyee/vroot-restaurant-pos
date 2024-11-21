import {
	Invoice,
	SalesInvoiceType,
} from '@src/app/features/invoices/domain/models/Invoice.model';
import { Tab } from './tab.model';
import { computed, Injector, signal } from '@angular/core';
import { deepMatch } from '../utils/utils';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { uuidv4 } from '../utils/uuid';
import { Customer, InvoiceIndexStore } from '@src/app/features';
import { InvoiceProduct } from '@src/app/features/invoices/domain/models/invoice-product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalcInvoicePricesUseCase } from '@src/app/features/invoices/domain/usecases/calc-invoice-prices.usecase';

type TabParams = {
	idxStore: InvoiceIndexStore;
	calcInvoiceUseCase: CalcInvoicePricesUseCase;
	invoice?: Invoice;
	injector: Injector;
};
export class InvoiceTab extends Tab {
	idxStore: InvoiceIndexStore;
	calcInvoiceUseCase: CalcInvoicePricesUseCase;
	injector: Injector;
	constructor({
		idxStore,
		calcInvoiceUseCase: calcInvoiceUseCase,
		invoice,
		injector,
	}: TabParams) {
		super('invoice');
		this.idxStore = idxStore;
		this.calcInvoiceUseCase = calcInvoiceUseCase;
		this.injector = injector;

		if (invoice) this.#initialInvoice.set(invoice);
		this.#isNewInvoice.set(!invoice);

		this.invoice.set(this.#initialInvoice());
	}

	_creationToken?: string;
	get creationToken() {
		return (this._creationToken ??= uuidv4());
	}

	override save(): Observable<any> {
		if (!this.hasChanges()) return of();

		// create | update invoice
		this.isLoading.set(true);

		let save = this.#isNewInvoice()
			? this.idxStore!.createInvoice({
					invoice: this.invoice(),
					creationToken: this.creationToken,
			  })
			: this.idxStore!.updateInvoice(this.invoice());

		return save.pipe(
			tap(() => {
				this.#initialInvoice.set(this.invoice());
				this.#isNewInvoice.set(false);
				this.isLoading.set(false);
			}),
			catchError((err) => {
				console.error('Error saving invoice ', err);
				this.isLoading.set(false);
				return throwError(() => err);
			}),
		);
	}

	override discard() {
		this.invoice.set(this.#initialInvoice());
	}

	override onActivate() {
		throw new Error('Method not implemented.');
	}

	override onClose() {
		throw new Error('Method not implemented.');
	}

	override isLoading = signal(false);

	override title = computed(() => {
		let title = this.invoice().customer?.name;
		if (!title) title = this.invoice().id?.toString();
		if (!title) title = 'New';

		return title;
	});

	override hasChanges = computed(
		() => !deepMatch(this.#initialInvoice(), this.invoice()),
	);

	override icon = computed(() =>
		this.isLoading() ? 'pi pi-spin pi-spinner' : 'pi pi-receipt',
	);

	#initialInvoice = signal<Invoice>({
		netPrice: 0,
		invoiceTax: 0,
		products: [],
	} as unknown as Invoice);
	invoice = signal<Invoice>({} as Invoice);
	#isNewInvoice = signal(true);

	addProduct(variant: ProductVariant, quantity = 1) {
		let existing = this.invoice().products?.find((p) => p.id == variant.id),
			invoice: Invoice;

		// product already exists, increase quantity
		if (existing) {
			existing.quantity = existing.quantity + quantity;

			invoice = {
				...this.invoice(),
				products: this.invoice().products.map((p) => {
					if (p.id == variant.id) return existing;
					return p;
				}),
			};
		} else {
			let newProduct: InvoiceProduct = {
				id: variant.id,
				productVariant: variant,
				quantity: quantity,
				price: variant.price,
				totalPrice: variant.price * quantity,
			};

			invoice = {
				...this.invoice(),
				products: [...this.invoice().products, newProduct],
			};
		}

		invoice = toSignal(this.calcInvoiceUseCase.execute({ invoice }), {
			initialValue: invoice,
			injector: this.injector,
		})();

		this.invoice.set(invoice);
	}

	removeProduct(id: number) {
		let invoice = {
			...this.invoice(),
			products: this.invoice().products.filter((p) => p.id != id),
		};

		invoice = toSignal(this.calcInvoiceUseCase.execute({ invoice }), {
			initialValue: invoice,
			injector: this.injector,
		})();

		this.invoice.set(invoice);
	}

	updateProduct(product: InvoiceProduct) {
		let invoice = {
			...this.invoice(),
			products: this.invoice().products.map((p) => {
				if (p.id == product.id) return product;
				return p;
			}),
		};

		invoice = toSignal(this.calcInvoiceUseCase.execute({ invoice }), {
			initialValue: invoice,
			injector: this.injector,
		})();

		this.invoice.set(invoice);
	}

	setCustomer(customer: Customer) {
		let invoice = { ...this.invoice() };

		if (!customer) delete invoice.customer;
		else invoice.customer = customer;

		this.invoice.set(invoice);
	}

	setSalesInvoiceType(salesInvoiceType: SalesInvoiceType) {
		this.invoice.set({ ...this.invoice(), salesInvoiceType });
	}

	setToBranchId(branch: Branch) {
		if (!branch?.id) return;
		this.invoice.set({ ...this.invoice(), toBranchId: branch.id });
	}
}
