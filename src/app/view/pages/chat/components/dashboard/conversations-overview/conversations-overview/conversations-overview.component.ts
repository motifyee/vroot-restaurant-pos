import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ListIconComponent } from '../../icons/list-icon.component';
import { SearchIconComponent } from '../../icons/search-icon.component';
import { ArrowRightIconComponent } from '../../icons/arrow-right-icon.component';
import { SortIconComponent } from '../../icons/sort-icon.component';
import { FilterIconComponent } from '../../icons/filter-icon.component';
import { SearchBarSectionComponent } from '../search-bar-section/search-bar-section.component';
import { SortingFilteringSectionComponent } from '../sorting-filtering-section/sorting-filtering-section.component';

@Component({
    selector: 'conversations-overview',
    imports: [
        ContactListComponent,
        ListIconComponent,
        ArrowRightIconComponent,
        SearchIconComponent,
        SortIconComponent,
        FilterIconComponent,
        SearchBarSectionComponent,
        SortingFilteringSectionComponent
    ],
    templateUrl: './conversations-overview.component.html',
    styleUrls: ['./conversations-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
  export class ConversationsOverviewComponent {}
  