import { Component, inject, input } from '@angular/core';
import { settingsStore } from '@webstore/state';

@Component({
    selector: 'banner',
    imports: [],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {
	settings = inject(settingsStore);

	fontSize = input<number>(30);

	companyInfo = this.settings.companyInfo;
}
