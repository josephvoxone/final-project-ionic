import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbreakPage } from './cbreak.page';

describe('CbreakPage', () => {
  let component: CbreakPage;
  let fixture: ComponentFixture<CbreakPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbreakPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbreakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
