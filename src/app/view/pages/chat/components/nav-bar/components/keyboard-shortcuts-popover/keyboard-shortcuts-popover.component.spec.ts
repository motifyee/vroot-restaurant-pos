import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardShortcutsPopoverComponent } from './keyboard-shortcuts-popover.component';

describe('KeyboardShortcutsPopoverComponent', () => {
  let component: KeyboardShortcutsPopoverComponent;
  let fixture: ComponentFixture<KeyboardShortcutsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardShortcutsPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardShortcutsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
