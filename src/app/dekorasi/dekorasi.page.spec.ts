import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DekorasiPage } from './dekorasi.page';

describe('DekorasiPage', () => {
  let component: DekorasiPage;
  let fixture: ComponentFixture<DekorasiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DekorasiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DekorasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
