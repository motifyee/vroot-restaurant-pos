import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPeriodsComponent } from './branch-periods.component';

describe('BranchPeriodsComponent', () => {
  let component: BranchPeriodsComponent;
  let fixture: ComponentFixture<BranchPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchPeriodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
