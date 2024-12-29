import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusPopoverComponent } from './change-status-popover.component';

describe('ChangeStatusPopoverComponent', () => {
  let component: ChangeStatusPopoverComponent;
  let fixture: ComponentFixture<ChangeStatusPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStatusPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
