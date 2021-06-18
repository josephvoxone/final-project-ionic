import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAkunPage } from './tab-akun.page';

describe('TabAkunPage', () => {
  let component: TabAkunPage;
  let fixture: ComponentFixture<TabAkunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAkunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAkunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
