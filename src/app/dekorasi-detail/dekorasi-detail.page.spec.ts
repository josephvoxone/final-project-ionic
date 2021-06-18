import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DekorasiDetailPage } from './dekorasi-detail.page';

describe('DekorasiDetailPage', () => {
  let component: DekorasiDetailPage;
  let fixture: ComponentFixture<DekorasiDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DekorasiDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DekorasiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
