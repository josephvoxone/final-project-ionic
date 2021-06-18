import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunAlamatPage } from './akun-alamat.page';

describe('AkunAlamatPage', () => {
  let component: AkunAlamatPage;
  let fixture: ComponentFixture<AkunAlamatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkunAlamatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkunAlamatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
