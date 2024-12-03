import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'reports-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/reports.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsIconComponent {}
