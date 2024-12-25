import {
	AfterViewInit,
	Component,
	computed,
	ElementRef,
	inject,
	output,
	signal,
	ViewChild,
} from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { settingsStore } from '@webstore/state';
import { BranchOrderTypePickerComponent } from '../pick-branch-modal/pick-branch-modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass } from '@angular/common';
import { BgImageComponent } from '@webstore/app/components/bg-image/bg-image.component';

@Component({
	selector: 'topbar',
	imports: [
		BranchOrderTypePickerComponent,
		SidebarComponent,
		NgClass,
		BgImageComponent,
	],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements AfterViewInit {
	toggleSideBarVisibility = output<void>();

	scrollService = inject(ScrollService);
	isSideBarVisible = signal(false);

	branchOrderTypeTarget = signal<'branch' | 'orderType'>('branch');

	ngAfterViewInit(): void {
		if (!this.container) return;

		this.scrollService.headerEl.set(this.container.nativeElement);
	}

	settings = inject(settingsStore);

	deliveryTitle = computed(() => {
		if (!this.settings.selectedBranch?.()) return '';
		if (this.settings.orderType() == 'delivery') return 'ديليفري';
		if (this.settings.orderType() == 'pickup') return 'استلام من الفرع';
		return '';
	});

	branchName = computed(() => this.settings.selectedBranch?.()?.name ?? '');

	@ViewChild('container') container: ElementRef<HTMLElement> | undefined;

	isBranchOrderTypePickerVisible = signal(false);

	isOrderTimeVisible = signal(false);
}
