import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;
  private isAuthenticated = false;
  private loginUrl = `${this.apiUrl}/auth/google/login`;
  private redirectUrl = `${this.apiUrl}/auth/google/redirect`;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  register(email: string, password: string, username: string): void {
    this.http
      .post(`${this.apiUrl}/auth/register`, { email, password, username })
      .subscribe((response) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/profile']);
      });
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((tokens) => {
          localStorage.setItem('jwtTokens', JSON.stringify(tokens));
          this.isAuthenticated = true;
          return true;
        }),
        catchError(() => {
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  googleLogin(): void {
    window.location.href = this.loginUrl;
  }

  handleRedirect(): Observable<any> {
    this.isAuthenticated = true;
    return this.http.get(this.redirectUrl, { withCredentials: true });
  }

  refresh(refreshToken: string): void {
    this.http
      .post(`${this.apiUrl}/auth/refresh`, { refreshToken })
      .subscribe((response) => {
        localStorage.setItem('jwtTokens', JSON.stringify(response));
        this.router.navigate(['/profile']);
      });
  }

  logout(): void {
    localStorage.removeItem('jwtTokens');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
