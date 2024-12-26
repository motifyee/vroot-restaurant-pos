import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPopoverComponent } from './sort-popover.component';

describe('SortPopoverComponent', () => {
  let component: SortPopoverComponent;
  let fixture: ComponentFixture<SortPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
