import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealboxCartPage } from './mealbox-cart.page';

describe('MealboxCartPage', () => {
  let component: MealboxCartPage;
  let fixture: ComponentFixture<MealboxCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealboxCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealboxCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
