import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'conversation-details',
  standalone: true,
  imports: [],
  templateUrl: './conversation-details.component.html',
  styleUrl: './conversation-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationDetailsComponent {

}
