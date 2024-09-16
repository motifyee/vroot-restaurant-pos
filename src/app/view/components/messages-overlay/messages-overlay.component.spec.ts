import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesOverlayComponent } from './messages-overlay.component';

describe('MessagesOverlayComponent', () => {
  let component: MessagesOverlayComponent;
  let fixture: ComponentFixture<MessagesOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
