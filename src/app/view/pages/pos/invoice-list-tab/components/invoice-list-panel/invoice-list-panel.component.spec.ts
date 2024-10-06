import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListPanelComponent } from './invoice-list-panel.component';

describe('InvoiceListPanelComponent', () => {
  let component: InvoiceListPanelComponent;
  let fixture: ComponentFixture<InvoiceListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
