import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPopoverComponent } from './team-popover.component';

describe('TeamPopoverComponent', () => {
  let component: TeamPopoverComponent;
  let fixture: ComponentFixture<TeamPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
