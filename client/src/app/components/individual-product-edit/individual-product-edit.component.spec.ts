import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualProductEditComponent } from './individual-product-edit.component';

describe('IndividualProductEditComponent', () => {
  let component: IndividualProductEditComponent;
  let fixture: ComponentFixture<IndividualProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualProductEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
