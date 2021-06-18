import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealboxSearchPage } from './mealbox-search.page';

describe('MealboxSearchPage', () => {
  let component: MealboxSearchPage;
  let fixture: ComponentFixture<MealboxSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealboxSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealboxSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
