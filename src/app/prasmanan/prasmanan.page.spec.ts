import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrasmananPage } from './prasmanan.page';

describe('PrasmananPage', () => {
  let component: PrasmananPage;
  let fixture: ComponentFixture<PrasmananPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrasmananPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrasmananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
