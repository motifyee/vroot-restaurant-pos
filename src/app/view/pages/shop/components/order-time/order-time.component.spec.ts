import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTimeComponent } from './order-time.component';

describe('OrderTimeComponent', () => {
  let component: OrderTimeComponent;
  let fixture: ComponentFixture<OrderTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
