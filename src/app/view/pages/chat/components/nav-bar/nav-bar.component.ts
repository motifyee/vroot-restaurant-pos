import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CampaignsComponent } from '@src/assets/chat/SVGs/campaigns.component';
import { CaptainComponent } from '@src/assets/chat/SVGs/captain.component';
import { ContactsComponent } from '@src/assets/chat/SVGs/contacts.component';
import { ConversationComponent } from '@src/assets/chat/SVGs/conversation.component';
import { InboxComponent } from '@src/assets/chat/SVGs/inbox.component';
import { NotificationComponent } from '@src/assets/chat/SVGs/notification.component';
import { PortalsComponent } from '@src/assets/chat/SVGs/portals.component';
import { ReportsComponent } from '@src/assets/chat/SVGs/reports.component';
import { SettingsComponent } from '@src/assets/chat/SVGs/settings.component';

@Component({
	selector: 'nav-bar',
	standalone: true,
	imports: [
		InboxComponent,
		ConversationComponent,
		CampaignsComponent,
		CaptainComponent,
		ContactsComponent,
		NotificationComponent,
		PortalsComponent,
		ReportsComponent,
		SettingsComponent,
	],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {}
