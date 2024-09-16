import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { rolesGuard } from './roles.guard';

describe('rolesGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
