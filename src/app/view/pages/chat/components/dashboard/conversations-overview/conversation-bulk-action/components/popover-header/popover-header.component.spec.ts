import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverHeaderComponent } from './popover-header.component';

describe('PopoverHeaderComponent', () => {
  let component: PopoverHeaderComponent;
  let fixture: ComponentFixture<PopoverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
