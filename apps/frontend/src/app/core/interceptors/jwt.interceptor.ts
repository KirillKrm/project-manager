import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../services/auth.service';
import { Jwt } from '../../types/Jwt';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokensSubject: BehaviorSubject<Jwt | null> =
    new BehaviorSubject<Jwt | null>(null);

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokensSubject.next(null);

      return this.authService.refresh().pipe(
        switchMap((tokens: Jwt) => {
          this.isRefreshing = false;
          this.cookieService.set('accessToken', tokens.accessToken);
          this.refreshTokensSubject.next({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          return next.handle(request);
        }),
        catchError((error: HttpErrorResponse) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokensSubject.pipe(
        filter((token: Jwt | null) => token !== null),
        take(1),
        switchMap(() => next.handle(request))
      );
    }
  }
}
