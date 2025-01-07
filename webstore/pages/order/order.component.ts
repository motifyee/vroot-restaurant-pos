import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';
import { CartItemsComponent } from '@webstore/components/cart/components/cart-items/cart-items.component';
import { GetCompanyDomainUseCase } from '@webstore/features/settings/domain/usecases/get-company-domain.usecase';
import { GetOrderTypeNameUseCase } from '@webstore/features/settings/domain/usecases/get-order-type-name.usecase';
import { settingsStore } from '@webstore/state';
import { ButtonModule } from 'primeng/button';
import { RatingModule, RatingRateEvent } from 'primeng/rating';

@Component({
	selector: 'order',
	imports: [
		ButtonModule,
		RatingModule,
		FormsModule,
		BgImageComponent,
		NgTemplateOutlet,
		CartItemsComponent,
	],
	templateUrl: './order.component.html',
	styleUrl: './order.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
	order = signal<GetInvoice>({
		id: 123,
		products: [
			{
				productVariantId: 123,
				title: 'product title',
				quantity: 1,
				price: 123,
				totalPrice: 246,
				note: 'note',
				additions: [
					{
						id: '123',
						name: 'addition name',
						with: true,
						without: false,
						price: 123,
						quantity: 1,
						totalPrice: 123,
					},
				],
			},
		],
		shippingAddressId: 0,
		salesInvoiceType: 3,
		note: 'invoice note',
		totalPrice: 246,
		toBranchId: 9,
		isUsualOrder: false,
		createdAt: '2021-01-01',
		rating: 2,
	});

	rateOrder(rating: RatingRateEvent) {
		// TODO update order rating using api
		this.order.set({ ...this.order(), rating: rating.value });
	}

	favoriteOrder() {
		// TODO update order favorite using api
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
