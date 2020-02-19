import {TestBed, async, inject} from '@angular/core/testing';

import {UserEnablingAuthGuard} from './user-enabling-auth.guard.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEnablingAuthGuard]
    });
  });

  it('should ...', inject([UserEnablingAuthGuard], (guard: UserEnablingAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
