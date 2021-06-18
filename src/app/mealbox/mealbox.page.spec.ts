import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealboxPage } from './mealbox.page';

describe('MealboxPage', () => {
  let component: MealboxPage;
  let fixture: ComponentFixture<MealboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealboxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
