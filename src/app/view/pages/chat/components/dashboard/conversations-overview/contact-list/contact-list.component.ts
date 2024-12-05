import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArrowLeftIconComponent } from '../../icons/arrow-left-icon.component';
import { ExclamationIconComponent } from '../../icons/exclamation-icon.component';
@Component({
  selector: 'contact-list',
  standalone: true,
  imports: [ArrowLeftIconComponent,ExclamationIconComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent {

}
