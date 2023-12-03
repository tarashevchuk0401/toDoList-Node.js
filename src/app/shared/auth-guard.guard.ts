import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)

  return authService.getIsAuthenticated();
};
