import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'reports',
	standalone: true,
	imports: [],
	template: `
		<svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="">
			<path
				d="M16.749 2h4.554l.1.014.099.028.06.026c.08.034.153.085.219.15l.04.044.044.057.054.09.039.09.019.064.014.064.009.095v4.532a.75.75 0 0 1-1.493.102l-.007-.102V4.559l-6.44 6.44a.75.75 0 0 1-.976.073L13 11 9.97 8.09l-5.69 5.689a.75.75 0 0 1-1.133-.977l.073-.084 6.22-6.22a.75.75 0 0 1 .976-.072l.084.072 3.03 2.91L19.438 3.5h-2.69a.75.75 0 0 1-.742-.648l-.007-.102a.75.75 0 0 1 .648-.743L16.75 2ZM3.75 17a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm5.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5ZM13.75 15a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm5.75-4.25a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0v-10.5Z"
				fill="currentColor"
			></path>
		</svg>
	`,
	styles: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {}
