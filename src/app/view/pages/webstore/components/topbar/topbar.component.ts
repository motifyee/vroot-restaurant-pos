import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	Output,
	signal,
	ViewChild,
} from '@angular/core';
import { OrderTimeComponent } from './order-time/order-time.component';
import { ScrollService } from '../../services/scroll.service';
import { OrderOptionComponent } from './order-type/order-type.component';

@Component({
	selector: 'topbar',
	standalone: true,
	imports: [OrderTimeComponent, OrderOptionComponent],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
})
export class HeaderComponent implements AfterViewInit {
	@Output() toggleSideBarVisibility = new EventEmitter<void>();

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
}
