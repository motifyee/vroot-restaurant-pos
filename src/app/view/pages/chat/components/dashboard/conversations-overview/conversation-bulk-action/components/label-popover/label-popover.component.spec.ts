import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPopoverComponent } from './label-popover.component';

describe('LabelPopoverComponent', () => {
  let component: LabelPopoverComponent;
  let fixture: ComponentFixture<LabelPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
