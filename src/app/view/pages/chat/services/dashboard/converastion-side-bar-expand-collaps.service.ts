// this service made to manage the state of expanding and collapsing the conversation side bar
// by clicking on the list icon in search-bar-section
import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class converastionSideBarExpandCollapsService {
	isConverastionSideBarExpand = signal(true);

	toggleExpandSideBar() {
		this.isConverastionSideBarExpand.update((state) => !state);
	}
}




