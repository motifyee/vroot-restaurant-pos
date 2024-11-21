import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilCategoryBarComponent } from './mobil-category-bar.component';

describe('MobilCategoryBarComponent', () => {
  let component: MobilCategoryBarComponent;
  let fixture: ComponentFixture<MobilCategoryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilCategoryBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilCategoryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
