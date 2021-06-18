import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRatePage } from './order-rate.page';

describe('OrderRatePage', () => {
  let component: OrderRatePage;
  let fixture: ComponentFixture<OrderRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
