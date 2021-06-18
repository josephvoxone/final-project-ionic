import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelesaiPage } from './order-selesai.page';

describe('OrderSelesaiPage', () => {
  let component: OrderSelesaiPage;
  let fixture: ComponentFixture<OrderSelesaiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSelesaiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSelesaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
