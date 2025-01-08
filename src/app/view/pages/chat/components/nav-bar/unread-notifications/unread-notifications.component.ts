import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GearIconComponent } from '../icons/gear-icon.component';
import { Button } from 'primeng/button';

@Component({
	selector: 'unread-notifications',
	imports: [CommonModule, GearIconComponent, Button],
	templateUrl: './unread-notifications.component.html',
	styleUrl: './unread-notifications.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnreadNotificationsComponent {}
