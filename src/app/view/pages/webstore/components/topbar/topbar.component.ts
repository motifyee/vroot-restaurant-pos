import {
	AfterViewInit,
	Component,
	computed,
	ElementRef,
	EventEmitter,
	inject,
	Output,
	signal,
	ViewChild,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { settingsStore } from '@src/app/features';
import { BranchOrderTypePickerComponent } from '../pick-branch-popup/pick-branch-popup.component';

@Component({
	selector: 'topbar',
	standalone: true,
	imports: [BranchOrderTypePickerComponent],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements AfterViewInit {
	@Output() toggleSideBarVisibility = new EventEmitter<void>();

	scrollService = inject(ScrollService);

	ngAfterViewInit(): void {
		if (!this.container) return;

		this.scrollService.headerEl.set(this.container.nativeElement);
	}

	settings = inject(settingsStore);

	deliveryTitle = computed(() => {
		if (!this.settings.selectedBranch?.()) return '';
		if (this.settings.orderType() == 'delivery') return 'توصيل من';
		if (this.settings.orderType() == 'pickup') return 'استلام من';
		return '';
	});

	branchName = computed(() => this.settings.selectedBranch?.()?.name ?? '');

	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	isBranchOrderTypePickerVisible = signal(false);

	isOrderTimeVisible = signal(false);
}
