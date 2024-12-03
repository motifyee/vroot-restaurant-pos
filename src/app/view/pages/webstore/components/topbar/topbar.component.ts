import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Output,
	signal,
	ViewChild,
} from '@angular/core';
import { OrderTimeComponent } from '../branch-card/order-time/order-time.component';
import { ScrollService } from '../../services/scroll.service';
import { OrderOptionComponent } from './order-type/order-type.component';
import { scaleInOut } from '../../animations/scaleInOut.animation';

@Component({
	selector: 'topbar',
	standalone: true,
	imports: [OrderTimeComponent, OrderOptionComponent],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
	animations: [scaleInOut],
})
export class HeaderComponent implements AfterViewInit {
	@Output() toggleSideBarVisibility = new EventEmitter<void>();

	scrollService = inject(ScrollService);
	ngAfterViewInit(): void {
		if (!this.container) return;
		this.scrollService.headerEl = this.container.nativeElement;
	}
	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	isOrderTypeVisible = signal(false);

	isOrderTimeVisible = signal(false);
}
