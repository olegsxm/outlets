import { TestBed } from '@angular/core/testing';

import { Products.ResolverService } from './products.resolver.service';

describe('Products.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Products.ResolverService = TestBed.get(Products.ResolverService);
    expect(service).toBeTruthy();
  });
});
