import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOptionComponent } from './order-option.component';

describe('OrderOptionComponent', () => {
  let component: OrderOptionComponent;
  let fixture: ComponentFixture<OrderOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
