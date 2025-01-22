import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { CartItemsComponent } from '@webstore/components/cart/components/cart-items/cart-items.component';
import { InvoiceType } from '@webstore/features/cart/data/repos/dto/sales-invoice-type';
import { invoiceStore, settingsStore, userStore } from '@webstore/state';
import { webstorePaths } from '@webstore/webstore.routes';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

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
	],
	templateUrl: './checkout.component.html',
	styleUrl: './checkout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
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

	checkout() {
		this.invoiceStore.executeActiveInvoice().subscribe({
			next: (invoice) => {
				console.log(invoice);
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
