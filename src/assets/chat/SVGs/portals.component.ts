import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'portals',
	standalone: true,
	imports: [],
	template: `
		<svg width="20" height="20" fill="none" viewBox="0 0 24 24" class="">
			<path
				d="M4 3h1c1.054 0 1.918.816 1.995 1.85L7 5v14a2.001 2.001 0 0 1-1.85 1.994L5 21H4a2.001 2.001 0 0 1-1.995-1.85L2 19V5c0-1.054.816-1.918 1.85-1.995L4 3h1-1Zm6 0h1c1.054 0 1.918.816 1.995 1.85L13 5v14a2.001 2.001 0 0 1-1.85 1.994L11 21h-1a2.001 2.001 0 0 1-1.995-1.85L8 19V5c0-1.054.816-1.918 1.85-1.995L10 3h1-1Zm6.974 2c.84 0 1.608.531 1.89 1.346l.047.157 3.015 11.745a2 2 0 0 1-1.296 2.392l-.144.043-.969.248a2.002 2.002 0 0 1-2.387-1.284l-.047-.155-3.016-11.745a2 2 0 0 1 1.298-2.392l.143-.043.968-.248c.166-.043.334-.064.498-.064ZM5 4.5H4a.501.501 0 0 0-.492.41L3.5 5v14c0 .244.177.45.41.492L4 19.5h1c.245 0 .45-.178.492-.41L5.5 19V5a.501.501 0 0 0-.41-.492L5 4.5Zm6 0h-1a.501.501 0 0 0-.492.41L9.5 5v14c0 .244.177.45.41.492l.09.008h1c.245 0 .45-.178.492-.41L11.5 19V5a.501.501 0 0 0-.41-.492L11 4.5Zm5.975 2-.063.004-.063.013-.968.247a.498.498 0 0 0-.376.51l.015.1 3.016 11.745a.5.5 0 0 0 .483.375l.063-.003.062-.012.97-.25a.5.5 0 0 0 .374-.519l-.015-.088-3.015-11.747a.501.501 0 0 0-.483-.375Z"
				fill="currentColor"
			></path>
		</svg>
	`,
	styles: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalsComponent {}
