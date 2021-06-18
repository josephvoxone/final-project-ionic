import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrasmananDetailPage } from './prasmanan-detail.page';

describe('PrasmananDetailPage', () => {
  let component: PrasmananDetailPage;
  let fixture: ComponentFixture<PrasmananDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrasmananDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrasmananDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
