import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	Input,
	signal,
	ViewChild,
} from '@angular/core';
import { OrderTimeComponent } from '../order-time/order-time.component';
import { OrderOptionComponent } from '../order-options/order-option/order-option.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [OrderTimeComponent, OrderOptionComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
	scrollService = inject(ScrollService);
	ngAfterViewInit(): void {
		if (!this.container) return;
		this.scrollService.headerEl = this.container.nativeElement;
	}
	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	// Signal to control order Time popup's visibility
	isOrderTimeVisible = signal(false);
	// Signal to control order options popup's visibility
	isOrderOptionsVisible = signal(false);

	// Method to toggle the visibility of order Time popup
	toggleOrderTimeVisibility() {
		this.isOrderTimeVisible.update((value) => !value);
	}

	// Method to toggle the visibility of order options popup
	toggleOrderOptionsVisibility() {
		this.isOrderOptionsVisible.update((value) => !value);
	}

	@Input() toggleVisibility!: () => void; // Function to toggle visibility of ChildTwo

	onButtonClick() {
		this.toggleVisibility(); // Call the parent's toggle method when button is clicked
	}
}
