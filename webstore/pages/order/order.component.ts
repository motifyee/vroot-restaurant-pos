import { Router, RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	OnInit,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { CartItemsComponent } from '@webstore/components/cart/components/cart-items/cart-items.component';
import { GetCompanyDomainUseCase } from '@webstore/features/settings/domain/usecases/get-company-domain.usecase';
import { GetOrderTypeNameUseCase } from '@webstore/features/settings/domain/usecases/get-order-type-name.usecase';
import { invoiceStore, settingsStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { webstorePaths } from '@webstore/webstore.routes';

@Component({
	selector: 'order',
	imports: [
		ButtonModule,
		RatingModule,
		FormsModule,
		BgImageComponent,
		NgTemplateOutlet,
		CartItemsComponent,
		SkeletonModule,
		RouterModule,
	],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit {
	orderId = input.required<number>();

	router = inject(Router);

	invoiceStore = inject(invoiceStore);
	order = computed(
		() => this.invoiceStore.invoiceEntityMap()[this.orderId()],
	);

	ngOnInit(): void {
		if (!this.order())
			this.invoiceStore.getInvoiceById({ id: this.orderId() }).subscribe({
				// next: () => {},
				error: () => {
					this.router.navigate(['/']);
				},
			});

		if (!this.settings.companyInfo())
			this.settings.getCompanyInfo().subscribe();
	}

	rateOrder(rating: RatingRateEvent) {
		this.invoiceStore
			.updateInvoice({
				...this.order(),
				rating: rating.value,
			})
			.subscribe();
	}

	favoriteOrder() {
		this.invoiceStore
			.updateInvoice({
				...this.order(),
				isUsualOrder: true,
			})
			.subscribe({
				next: () => {
					this.router.navigate([webstorePaths.usuals]);
				},
			});
	}

	// ###########################################################################

	settings = inject(settingsStore);
	branchName = computed(() => {
		const branches = this.settings.companyInfo().branchs;
		return branches.find((branch) => branch.id === this.order().toBranchId)
			?.name;
	});

	domain = inject(GetCompanyDomainUseCase);

	getOrderTypeName = inject(GetOrderTypeNameUseCase);
	orderType = computed(() =>
		this.getOrderTypeName.execute(this.order().salesInvoiceType),
	);

	whatsappMsg = computed(() => {
		return `
order number | رقم الطلب
%0A
*%23${this.order().id}*
%0A %0A

from | من
%0A
*${this.domain.execute()}*
%0A %0A

Branch | الفرع
%0A
*${this.branchName()}*
%0A %0A
    `;
	});
}
