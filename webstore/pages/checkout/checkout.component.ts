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
		this.invoiceStore.clearApiMsg(UPDATE_INVOICE);
	}

	private router = inject(Router);

	settings = inject(settingsStore);
	user = inject(userStore);
	invoiceStore = inject(invoiceStore);

	orderNote = signal<string>('');

	deliveryTitle = computed(() => {
		if (!this.settings.selectedBranch?.()) return '';
		if (this.settings.defaultInvoiceType() == InvoiceType.delivery)
			return 'ديليفري';

		if (this.settings.defaultInvoiceType() == InvoiceType.pickup)
			return 'استلام';
		return '';
	});

	apiMsg = computed(() => this.invoiceStore.getApiMsg(UPDATE_INVOICE));
	isApiMsgActive = computed(() =>
		this.invoiceStore.isApiMsgActive(UPDATE_INVOICE),
	);

	checkout() {
		this.invoiceStore.clearApiMsg(UPDATE_INVOICE);

		this.invoiceStore.executeActiveInvoice().subscribe({
			next: (invoice) => {
				this.invoiceStore.setSelectedAddress(null);
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
