import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'my-orders',
    imports: [],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {}
