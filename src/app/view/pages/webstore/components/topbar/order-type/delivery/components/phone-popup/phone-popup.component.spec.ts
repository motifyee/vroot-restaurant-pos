import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonePopupComponent } from './phone-popup.component';

describe('PhonePopupComponent', () => {
  let component: PhonePopupComponent;
  let fixture: ComponentFixture<PhonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
