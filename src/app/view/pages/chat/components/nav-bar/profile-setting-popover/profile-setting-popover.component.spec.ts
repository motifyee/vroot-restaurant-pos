import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingPopoverComponent } from './profile-setting-popover.component';

describe('ProfileSettingPopoverComponent', () => {
  let component: ProfileSettingPopoverComponent;
  let fixture: ComponentFixture<ProfileSettingPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSettingPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSettingPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
