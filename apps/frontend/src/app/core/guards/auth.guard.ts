import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { catchError, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {
    return authService.refresh().pipe(
      switchMap(() => of(true)),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  } else {
    return true;
  }
};
