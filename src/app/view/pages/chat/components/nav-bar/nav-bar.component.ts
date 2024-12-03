import { ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { CampaignIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/campaign-icon.component';
import { CaptainIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/captain-icon.component';
import { ContactsIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/contacts-icon.component';
import { ConversationIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/conversation-icon.component';
import { InboxIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/inbox-icon.component';
import { MessageIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/message-icon.component';
import { NotificationIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/notification-icon.component';
import { PortalsIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/portals-icon.component';
import { ReportsIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/reports-icon.component';
import { SettingsIconComponent } from '@src/app/view/pages/chat/components/nav-bar/icons/settings-icon.component';
import { UnreadNotificationsComponent } from "./unread-notifications/unread-notifications.component";

@Component({
	selector: 'nav-bar',
	standalone: true,
	imports: [
    InboxIconComponent,
    ConversationIconComponent,
    CampaignIconComponent,
    CaptainIconComponent,
    ContactsIconComponent,
    NotificationIconComponent,
    PortalsIconComponent,
    ReportsIconComponent,
    SettingsIconComponent,
    MessageIconComponent,
    UnreadNotificationsComponent
],
	templateUrl: './nav-bar.component.html',
	styleUrl: './nav-bar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {


	// UnreadNotifications
	showUnreadNotifications = signal(false); // Signal to control popup visibility

  toggleUnreadNotifications() {
    this.showUnreadNotifications.set(!this.showUnreadNotifications()); // Toggle popup visibility
  }

  handleUnreadNotificationsClose() {
    this.showUnreadNotifications.set(false); // Close the popup
  }
	// ./UnreadNotifications

}
