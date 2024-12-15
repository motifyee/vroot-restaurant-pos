import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	signal,
} from '@angular/core';
import { HttpService } from '@src/app/core';

@Component({
	selector: 'lazy-svg',
	standalone: true,
	providers: [],
	template: ` <div [innerHTML]="content()"></div> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements AfterContentInit {
	http = inject(HttpService);

	path = input.required<string>();

	content = signal('');

	ngAfterContentInit(): void {
		let path = `${this.path()}`;
		let r = this.http.getText(path);
		r.subscribe({
			next: (m) => this.content.set(m),
			error: (error) => {
				console.error(error);
			},
		});
	}
}
