import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { GetOrderTypeNameUseCase } from '@webstore/features';
import { invoiceStore, userStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'my-orders',
	imports: [
		SkeletonModule,
		ButtonModule,
		SkeletonModule,
		DatePipe,
		BgImageComponent,
		TagModule,
		NgTemplateOutlet,
	],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
	invoices = inject(invoiceStore);
	router = inject(Router);
	user = inject(userStore);

	ngOnInit(): void {
		if (!this.user.isLoggedIn()) {
			this.router.navigate(['/']);
			return;
		}

		this.invoices.getInvoices({
			pageNumber: 1,
			pageSize: 10,
		});
	}

	getOrderTypeName = inject(GetOrderTypeNameUseCase);
	getOrderType(invoice: GetInvoice) {
		return this.getOrderTypeName.execute(invoice.salesInvoiceType);
	}

	getOrderStatus(invoice: GetInvoice): {
		label: string;
		severity:
			| 'info'
			| 'success'
			| 'danger'
			| 'secondary'
			| 'warn'
			| 'contrast';
		icon: string;
	} {
		switch (invoice.preparationStage) {
			case 'preparing':
				return {
					label: 'قيد التجهيز',
					severity: 'warn',
					icon: 'pi pi-exclamation-triangle',
				};
			case 'prepared':
				return {
					label: 'جاهز',
					severity: 'info',
					icon: 'pi pi-check',
				};
			case 'delivered':
				return {
					label: 'مكتمل',
					severity: 'success',
					icon: 'pi pi-check-circle',
				};
			default:
				return {
					label: 'لم يتم الطلب',
					severity: 'danger',
					icon: 'pi pi-cart-arrow-down',
				};
		}
	}
}
