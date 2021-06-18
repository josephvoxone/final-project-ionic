import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrasmananSearchPage } from './prasmanan-search.page';

describe('PrasmananSearchPage', () => {
  let component: PrasmananSearchPage;
  let fixture: ComponentFixture<PrasmananSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrasmananSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrasmananSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
