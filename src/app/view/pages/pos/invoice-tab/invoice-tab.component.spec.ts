import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTabComponent } from './invoice-tab.component';

describe('InvoiceTabComponent', () => {
	let component: InvoiceTabComponent;
	let fixture: ComponentFixture<InvoiceTabComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [InvoiceTabComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(InvoiceTabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
