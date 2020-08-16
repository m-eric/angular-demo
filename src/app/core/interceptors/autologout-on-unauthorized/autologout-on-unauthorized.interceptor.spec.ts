import { TestBed } from '@angular/core/testing';

import { AutologoutOnUnauthorizedInterceptor } from './autologout-on-unauthorized.interceptor';

describe('AutologoutOnUnauthorizedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutologoutOnUnauthorizedInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AutologoutOnUnauthorizedInterceptor = TestBed.inject(AutologoutOnUnauthorizedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
