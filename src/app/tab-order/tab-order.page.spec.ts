import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOrderPage } from './tab-order.page';

describe('TabOrderPage', () => {
  let component: TabOrderPage;
  let fixture: ComponentFixture<TabOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
