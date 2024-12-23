import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	input,
	Output,
	output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '@src/app/features';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'add-customer-popup',
    imports: [
        DialogModule,
        ToggleButtonModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        TableModule,
        DropdownModule,
    ],
    templateUrl: './customer-popup.component.html',
    styleUrl: './customer-popup.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCustomerPopupComponent {
	@Output() addCustomer = new EventEmitter<Customer>();
	@Output() dismiss = new EventEmitter();
	customer = input.required<Customer>();

	selectedCity!: City;
	cities = [
		{ name: 'New York', code: 'NY' },
		{ name: 'Rome', code: 'RM' },
		{ name: 'London', code: 'LDN' },
		{ name: 'Istanbul', code: 'IST' },
		{ name: 'Paris', code: 'PRS' },
	];

	logCustomer() {
		this.addCustomer.emit(this.customer());
		console.log(this.customer());
	}

	finish() {
		this.addCustomer.emit(this.customer());
		this.dismiss.emit();
	}
}

interface City {
	name: string;
	code: string;
}
