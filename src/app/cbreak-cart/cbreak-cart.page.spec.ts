import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbreakCartPage } from './cbreak-cart.page';

describe('CbreakCartPage', () => {
  let component: CbreakCartPage;
  let fixture: ComponentFixture<CbreakCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbreakCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbreakCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
