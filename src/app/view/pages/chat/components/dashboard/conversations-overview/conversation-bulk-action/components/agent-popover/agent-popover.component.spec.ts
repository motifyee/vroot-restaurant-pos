import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPopoverComponent } from './agent-popover.component';

describe('AgentPopoverComponent', () => {
  let component: AgentPopoverComponent;
  let fixture: ComponentFixture<AgentPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
