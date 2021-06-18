import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrasmananCartPage } from './prasmanan-cart.page';

describe('PrasmananCartPage', () => {
  let component: PrasmananCartPage;
  let fixture: ComponentFixture<PrasmananCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrasmananCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrasmananCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
