import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFavorPage } from './order-favor.page';

describe('OrderFavorPage', () => {
  let component: OrderFavorPage;
  let fixture: ComponentFixture<OrderFavorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFavorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFavorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
