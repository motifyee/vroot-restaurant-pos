import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartItemModalComponent } from './add-to-cart-item-modal.component';

describe('AddToCartItemModalComponent', () => {
  let component: AddToCartItemModalComponent;
  let fixture: ComponentFixture<AddToCartItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartItemModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
