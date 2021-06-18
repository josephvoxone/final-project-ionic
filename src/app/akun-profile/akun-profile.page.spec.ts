import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkunProfilePage } from './akun-profile.page';

describe('AkunProfilePage', () => {
  let component: AkunProfilePage;
  let fixture: ComponentFixture<AkunProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkunProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkunProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
