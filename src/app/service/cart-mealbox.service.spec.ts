import { TestBed } from '@angular/core/testing';

import { CartMealboxService } from './cart-mealbox.service';

describe('CartMealboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartMealboxService = TestBed.get(CartMealboxService);
    expect(service).toBeTruthy();
  });
});
