import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingFilteringSectionComponent } from './sorting-filtering-section.component';

describe('SortingFilteringSectionComponent', () => {
	let component: SortingFilteringSectionComponent;
	let fixture: ComponentFixture<SortingFilteringSectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SortingFilteringSectionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SortingFilteringSectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
