import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { CartItemsComponent } from '@webstore/components/cart/components/cart-items/cart-items.component';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';
import { invoiceStore, settingsStore, userStore } from '@webstore/state';
import { UPDATE_INVOICE } from '@webstore/state/invoice/features/with-update-invoice.method';
import { webstorePaths } from '@webstore/webstore.routes';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
	selector: 'checkout',
	imports: [
		InputTextModule,
		InputGroup,
		InputGroupAddonModule,
		NgTemplateOutlet,
		CardModule,
		BgImageComponent,
		CartItemsComponent,
		FormsModule,
		ButtonModule,
		RouterLink,
		MessageModule,
	],
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
	ngOnInit(): void {
		this.invoices.clearApiMsg(UPDATE_INVOICE);
	}

	private router = inject(Router);

	settings = inject(settingsStore);
	user = inject(userStore);
	invoices = inject(invoiceStore);

	orderNote = signal<string>('');

	deliveryTitle = computed(() => {
		const invoiceType = this.invoices.activeInvoice()?.salesInvoiceType;
		if (typeof invoiceType !== 'number') return '';

		if (invoiceType == InvoiceType.delivery) return 'ديليفري';

		if (invoiceType == InvoiceType.pickup) return 'استلام';
		return '';
	});

	orderTypeIcon = computed(() => {
		return InvoiceType[this.invoices.activeInvoice()?.salesInvoiceType!];
	});

	apiMsg = computed(() => this.invoices.getApiMsg(UPDATE_INVOICE));
	isApiMsgActive = computed(() =>
		this.invoices.isApiMsgActive(UPDATE_INVOICE),
	);

	checkout() {
		this.invoices.clearApiMsg(UPDATE_INVOICE);

		this.invoices.executeActiveInvoice().subscribe({
			next: (invoice) => {
				this.invoices.setSelectedAddress(null);
				this.router.navigate([
					webstorePaths.order(invoice?.id.toString()),
				]);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
}
