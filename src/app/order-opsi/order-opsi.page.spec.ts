import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOpsiPage } from './order-opsi.page';

describe('OrderOpsiPage', () => {
  let component: OrderOpsiPage;
  let fixture: ComponentFixture<OrderOpsiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOpsiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOpsiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
