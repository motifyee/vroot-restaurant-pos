import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsualOrdersComponent } from './usual-orders.component';

describe('UsualOrdersComponent', () => {
  let component: UsualOrdersComponent;
  let fixture: ComponentFixture<UsualOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsualOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsualOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
