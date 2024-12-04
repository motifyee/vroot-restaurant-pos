import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickBranchPopupComponent } from './pick-branch-popup.component';

describe('PickBranchPopupComponent', () => {
	let component: PickBranchPopupComponent;
	let fixture: ComponentFixture<PickBranchPopupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PickBranchPopupComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PickBranchPopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
