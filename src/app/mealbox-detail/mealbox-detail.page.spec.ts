import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealboxDetailPage } from './mealbox-detail.page';

describe('MealboxDetailPage', () => {
  let component: MealboxDetailPage;
  let fixture: ComponentFixture<MealboxDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealboxDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealboxDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
