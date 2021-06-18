import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbreakDetailPage } from './cbreak-detail.page';

describe('CbreakDetailPage', () => {
  let component: CbreakDetailPage;
  let fixture: ComponentFixture<CbreakDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbreakDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbreakDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
