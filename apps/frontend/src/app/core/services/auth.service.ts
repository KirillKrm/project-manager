import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Jwt } from '../../types/Jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loginUrl = `${this.apiUrl}/auth/google/login`;
  private redirectUrl = `${this.apiUrl}/auth/google/redirect`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(
    username: string,
    email: string,
    password: string
  ): Observable<Jwt | string> {
    return this.http
      .post<Jwt>(`${this.apiUrl}/auth/register`, {
        username,
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<Jwt | string> {
    return this.http
      .post<Jwt>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }

  googleLogin(): void {
    window.location.href = this.loginUrl;
  }

  handleRedirect(): Observable<Jwt> {
    return this.http.get<Jwt>(this.redirectUrl, {
      withCredentials: true,
    });
  }

  refresh(): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.apiUrl}/auth/refresh`, {
      withCredentials: true,
    });
  }

  logout(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
  }

  isTokenExpired(): boolean {
    const accessToken = this.cookieService.get('accessToken');
    if (!accessToken) {
      return true;
    }
    try {
      const { exp: expirationTime } = jwtDecode<{ exp: number }>(accessToken);
      return Date.now() >= expirationTime * 1000;
    } catch {
      return true;
    }
  }
}
