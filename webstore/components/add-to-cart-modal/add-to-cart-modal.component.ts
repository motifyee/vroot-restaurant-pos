import {
	Component,
	OnInit,
	input,
	inject,
	signal,
	HostBinding,
	output,
	effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { invoiceStore } from '@webstore/state';
import { BannerComponent } from '../../pages/products/components/banner/banner.component';
import { scaleInOut } from '../../animations/scale-in-out.animation';
import { ModalComponent } from '../modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { NgTemplateOutlet } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ScrollService } from '@webstore/services/scroll.service';
import { addToCartStore } from './state/add-to-cart.store';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'add-to-cart-modal, [add-to-cart-modal]',
	imports: [
		FormsModule,
		BannerComponent,
		ModalComponent,
		ButtonModule,
		NgTemplateOutlet,
		ButtonModule,
		TooltipModule,
		SkeletonModule,
	],
	providers: [ScrollService, addToCartStore],
	templateUrl: './add-to-cart-modal.component.html',
	styleUrls: ['./add-to-cart-modal.component.scss'],
	host: { class: 'popup' },
	animations: [scaleInOut],
})
export class AddToCartItemModalComponent implements OnInit {
	@HostBinding('@scaleInOut') scaleInOutAnimation = true;

	store = inject(addToCartStore);

	invoiceStore = inject(invoiceStore);

	scrollService = inject(ScrollService);

	closeModal = output<void>();
	product = input.required<InvoiceProduct>();

	note = signal('');
	_syncNote = effect(() => this.store.setNote(this.note()));

	setQty($event: Event) {
		const value = +(<HTMLInputElement>$event.currentTarget).value;
		this.store.setQty(value);
	}

	// ###########################################################################

	ngOnInit(): void {
		this.store.setProduct(this.product());
	}
	// ###########################################################################

	addToCart() {
		this.invoiceStore.addProduct(this.store.computedProduct()).subscribe({
			next: () => {
				this.closeModal.emit();
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
}
