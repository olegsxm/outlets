import { TestBed } from '@angular/core/testing';

import { ProductsResolver } from './products.resolver';

describe('Products.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsResolver = TestBed.get(ProductsResolver);
    expect(service).toBeTruthy();
  });
});
