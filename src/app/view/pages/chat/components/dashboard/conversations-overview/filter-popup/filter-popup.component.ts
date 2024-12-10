import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DismissIconComponent } from "../../../nav-bar/icons/dismiss-icon.component";

@Component({
  selector: 'filter-popup',
  standalone: true,
  imports: [DismissIconComponent],
  templateUrl: './filter-popup.component.html',
  styleUrl: './filter-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPopupComponent {

}
