import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { invoiceStore, userStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'my-orders',
	imports: [SkeletonModule, ButtonModule, SkeletonModule],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
	invoices = inject(invoiceStore);
	router = inject(Router);
	user = inject(userStore);

	ngOnInit(): void {
		// if (!this.user.isLoggedIn()) {
		// 	this.router.navigate(['/']);
		// 	return;
		// }

		this.invoices.getInvoices({
			pageNumber: 1,
			pageSize: 10,
		});
	}
}
