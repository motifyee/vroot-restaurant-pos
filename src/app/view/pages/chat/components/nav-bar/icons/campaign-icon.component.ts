import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'campaign-icon',
	standalone: true,
	templateUrl: '../../../../../../../assets/chat/icons/campaign.svg',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignIconComponent {}
