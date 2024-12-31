import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPerChatTypeComponent } from './contacts-per-chat-type.component';

describe('ContactsPerChatTypeComponent', () => {
  let component: ContactsPerChatTypeComponent;
  let fixture: ComponentFixture<ContactsPerChatTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsPerChatTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsPerChatTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
