import { TestBed } from '@angular/core/testing';

import { DekorasiService } from './dekorasi.service';

describe('DekorasiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DekorasiService = TestBed.get(DekorasiService);
    expect(service).toBeTruthy();
  });
});
