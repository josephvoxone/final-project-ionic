import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbreakSearchPage } from './cbreak-search.page';

describe('CbreakSearchPage', () => {
  let component: CbreakSearchPage;
  let fixture: ComponentFixture<CbreakSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbreakSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbreakSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
