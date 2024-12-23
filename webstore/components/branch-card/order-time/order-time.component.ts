import { NgClass, CommonModule } from '@angular/common';
import {
	Component,
	Input,
	Signal,
	OnInit,
	EventEmitter,
	Output,
} from '@angular/core';

@Component({
    selector: 'order-time',
    imports: [CommonModule],
    templateUrl: './order-time.component.html',
    styleUrls: ['./order-time.component.scss'], // Note corrected property name to `styleUrls`
    host: { class: 'popup' }
})
export class OrderTimeComponent implements OnInit {
	@Input() isOrderTimeVisible!: Signal<boolean>;

	// New flag to control the initial render
	hasRenderedOnce = false;

	ngOnInit(): void {
		// Delay setting `hasRenderedOnce` to true to avoid triggering the `hide` class on initial render
		setTimeout(() => {
			this.hasRenderedOnce = true;
		}, 0); // This sets the flag after the initial render cycle
	}

	@Output() dismiss = new EventEmitter<void>();
}
