import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchOrderTypePickerComponent } from './pick-branch-popup.component';

describe('PickBranchPopupComponent', () => {
	let component: BranchOrderTypePickerComponent;
	let fixture: ComponentFixture<BranchOrderTypePickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BranchOrderTypePickerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BranchOrderTypePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
