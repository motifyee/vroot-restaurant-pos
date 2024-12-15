import {
	Component,
	OnInit,
	input,
	Output,
	EventEmitter,
	inject,
	computed,
	signal,
	HostBinding,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { productStore } from '@src/app/features/products';
import { BannerComponent } from '../banner/banner.component';
import { scaleInOut } from '../../../../animations/scaleInOut.animation';

@Component({
	selector: 'add-to-cart-modal, [add-to-cart-modal]',
	standalone: true,
	imports: [FormsModule, BannerComponent],
	templateUrl: './add-to-cart-modal.component.html',
	styleUrls: ['./add-to-cart-modal.component.scss'],
	host: { class: 'popup' },
	animations: [scaleInOut],
})
export class AddToCartItemModalComponent implements OnInit {
	@HostBinding('@scaleInOut') scaleInOutAnimation = true;

	productStore = inject(productStore);

	options = [
		{ name: 'سلطة ورق عنب', price: 29, checked: false },
		{ name: 'سيزر', price: 24, checked: false },
		{ name: 'جرجير', price: 23, checked: false },
		{ name: 'فتوش', price: 21, checked: false },
		{ name: 'يونانية', price: 23, checked: false },
	];

	@Output() closeModal = new EventEmitter<void>();
	variant = input<ProductVariant>();
	quantity = signal(1);
	note = signal('');

	isVisible = computed(() => !!this.variant());

	// New flag to control the initial render
	hasRenderedOnce = false;

	ngOnInit(): void {
		setTimeout(() => {
			this.hasRenderedOnce = true;
		}, 0); // This sets the flag after the initial render cycle
	}

	incrementQuantity() {
		this.quantity.update((quantity) => quantity + 1);
	}

	decrementQuantity() {
		if (this.quantity() > 1) {
			this.quantity.update((quantity) => quantity - 1);
		}
	}

	addToCart() {
		if (!this.variant()) return;

		let cartProduct = {
			variant: { ...this.variant()!, note: this.note() },
			quantity: this.quantity(),
		};

		this.productStore.addToCart(cartProduct);

		this.closeModal.emit();
	}
}
