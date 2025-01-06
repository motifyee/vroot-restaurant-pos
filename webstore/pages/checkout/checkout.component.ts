import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { uuidv4 } from '@src/app/view/state/app/utils/uuid';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { CartItemsComponent } from '@webstore/components/cart-items/cart-items.component';
import {
	cartStore,
	invoiceStore,
	settingsStore,
	userStore,
} from '@webstore/state';
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
	settings = inject(settingsStore);
	user = inject(userStore);
	cart = inject(cartStore);
	invoiceStore = inject(invoiceStore);

	orderNote = signal<string>('');

	deliveryTitle = computed(() => {
		if (!this.settings.selectedBranch?.()) return '';
		if (this.settings.orderType() == 'delivery') return 'ديليفري';
		if (this.settings.orderType() == 'pickup') return 'استلام';
		return '';
	});

	creationToken = uuidv4();
	checkout() {
		// 	this.invoiceStore
		// 		.createInvoiceFromCartProducts({
		// 			creationToken: this.creationToken,
		// 			products: this.cart.products(),
		// 			shippingAddressId: this.user.defaultAddress()!.id,
		// 			salesInvoiceType: this.settings.orderTypeId()!,
		// 			isUsualOrder: false,
		// 			note: this.orderNote(),
		// 		})
		// 		.subscribe(() => {
		// 			this.cart.emptyCart();
		// 			this.creationToken = uuidv4();
		// 		});
	}
}
