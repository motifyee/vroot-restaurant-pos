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
			background-color: inherit;
			mask-size: contain;
			mask-repeat: no-repeat;
			mask-position: center;
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

	color = input<string | null>(null);
	@HostBinding('style.background-color') get _color() {
		return this.color() ?? 'unset';
	}

	src = input.required<string>();
	@HostBinding('style.background-image') get _background() {
		if (this.color()) return `unset`;

		return `url(${this.src()})`;
	}
	@HostBinding('style.mask-image') get _mask() {
		if (!this.color()) return `unset`;

		return `url(${this.src()})`;
	}
}
