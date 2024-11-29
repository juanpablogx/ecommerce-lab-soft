import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProductAddComponent } from './individual-product-add.component';

describe('IndividualProductAddComponent', () => {
  let component: IndividualProductAddComponent;
  let fixture: ComponentFixture<IndividualProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualProductAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
