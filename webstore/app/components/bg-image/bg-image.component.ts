import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	input,
} from '@angular/core';

@Component({
	selector: 'bg-img, [bgImg]',
	template: '',
	styles: `
		:host {
			@apply block bg-no-repeat bg-center bg-contain;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgImageComponent {
	width = input<number>(32);
	@HostBinding('style.width') get _width() {
		return `${this.width()}px`;
	}

	height = input<number>(32);
	@HostBinding('style.height') get _height() {
		return `${this.height()}px`;
	}

	url = input.required<string>();
	@HostBinding('style.background-image') get _url() {
		return `url(${this.url()})`;
	}
}
