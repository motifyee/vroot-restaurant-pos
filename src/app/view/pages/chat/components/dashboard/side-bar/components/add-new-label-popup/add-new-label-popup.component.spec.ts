import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLabelPopupComponent } from './add-new-label-popup.component';

describe('AddNewLabelPopupComponent', () => {
  let component: AddNewLabelPopupComponent;
  let fixture: ComponentFixture<AddNewLabelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewLabelPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewLabelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
