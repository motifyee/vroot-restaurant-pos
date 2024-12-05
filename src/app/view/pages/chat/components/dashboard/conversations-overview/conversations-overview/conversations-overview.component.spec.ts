import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsOverviewComponent } from './conversations-overview.component';

describe('ConversationsOverviewComponent', () => {
	let component: ConversationsOverviewComponent;
	let fixture: ComponentFixture<ConversationsOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConversationsOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ConversationsOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
