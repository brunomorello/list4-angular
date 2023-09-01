import { TestBed } from '@angular/core/testing';

import { AuthorizedResolver } from './authorized.resolver';

describe('AuthorizedResolver', () => {
  let resolver: AuthorizedResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AuthorizedResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
