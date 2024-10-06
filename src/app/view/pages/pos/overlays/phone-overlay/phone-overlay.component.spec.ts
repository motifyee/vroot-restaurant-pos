import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOverlayComponent } from './phone-overlay.component';

describe('PhoneOverlayComponent', () => {
  let component: PhoneOverlayComponent;
  let fixture: ComponentFixture<PhoneOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
