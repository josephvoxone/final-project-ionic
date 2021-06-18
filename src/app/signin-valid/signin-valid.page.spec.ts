import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninValidPage } from './signin-valid.page';

describe('SigninValidPage', () => {
  let component: SigninValidPage;
  let fixture: ComponentFixture<SigninValidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninValidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninValidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
