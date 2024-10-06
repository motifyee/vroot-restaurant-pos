import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListTabComponent } from './invoice-list-tab.component';

describe('InvoiceListTabComponent', () => {
  let component: InvoiceListTabComponent;
  let fixture: ComponentFixture<InvoiceListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
