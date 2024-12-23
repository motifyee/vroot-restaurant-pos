import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'edit-product-popup',
    imports: [FormsModule, ButtonModule, InputTextModule, DialogModule],
    templateUrl: './edit-product-popup.component.html',
    styleUrl: './edit-product-popup.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductPopupComponent {
	@Output() editProduct = new EventEmitter<ProductVariant>();
	@Output() dismiss = new EventEmitter();
}
