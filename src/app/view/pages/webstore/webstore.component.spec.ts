import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebstoreComponent } from './webstore.component';

describe('ShopComponent', () => {
	let component: WebstoreComponent;
	let fixture: ComponentFixture<WebstoreComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WebstoreComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(WebstoreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
