import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { invoiceStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'my-orders',
	imports: [SkeletonModule, ButtonModule],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
	invoices = inject(invoiceStore);

	ngOnInit(): void {
		this.invoices.getInvoices({
			pageNumber: 1,
			pageSize: 10,
		});
	}
}
