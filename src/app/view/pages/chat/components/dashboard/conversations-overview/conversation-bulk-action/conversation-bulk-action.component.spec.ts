import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationBulkActionComponent } from './conversation-bulk-action.component';

describe('ConversationBulkActionComponent', () => {
	let component: ConversationBulkActionComponent;
	let fixture: ComponentFixture<ConversationBulkActionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConversationBulkActionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ConversationBulkActionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
