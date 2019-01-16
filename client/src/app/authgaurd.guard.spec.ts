import { TestBed, async, inject } from '@angular/core/testing';

import { AuthgaurdGuard } from './authgaurd.guard';

describe('AuthgaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgaurdGuard]
    });
  });

  it('should ...', inject([AuthgaurdGuard], (guard: AuthgaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
