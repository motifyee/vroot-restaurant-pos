import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon.component';
import { ExclamationIconComponent } from '../../icons/exclamation-icon.component';
@Component({
	selector: 'contact-list',
	standalone: true,
	imports: [ArrowLeftIconComponent, ExclamationIconComponent],
	templateUrl: './contact-list.component.html',
	styleUrl: './contact-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
	// Signal for active tab
	activeTab = signal('mine'); // Default is 'mine'

	// Method to change the active tab
	setActiveTab(tab: string) {
		this.activeTab.set(tab);
	}
}
