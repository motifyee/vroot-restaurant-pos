import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'chat',
	standalone: true,
	imports: [NavBarComponent, RouterOutlet],
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss', './style/styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {}
