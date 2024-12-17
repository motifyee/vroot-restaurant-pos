import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressesModalComponent } from './user-addresses-modal.component';

describe('UserAddressesModalComponent', () => {
  let component: UserAddressesModalComponent;
  let fixture: ComponentFixture<UserAddressesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
