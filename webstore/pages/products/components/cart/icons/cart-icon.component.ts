import { Component } from '@angular/core';

@Component({
	selector: 'cart-icon',
	standalone: true,
	templateUrl: './cart.svg',
	styles: [
		`
			:host {
				display: block;
			}
			svg {
				width: 100%;
				height: 100%;
			}
		`,
	],
})
export class CartIconComponent {}
