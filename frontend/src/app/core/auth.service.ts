import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenPair } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private loggedInSignal = signal<boolean>(!!localStorage.getItem(this.accessTokenKey));

  readonly isLoggedIn = computed(() => this.loggedInSignal());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<TokenPair> {
    return this.http
      .post<TokenPair>(`${environment.apiBaseUrl}/api/token/`, { username, password })
      .pipe(tap((tokenPair) => this.storeTokens(tokenPair)));
  }

  refreshToken(): Observable<{ access: string }> {
    return this.http
      .post<{ access: string }>(`${environment.apiBaseUrl}/api/token/refresh/`, {
        refresh: this.getRefreshToken()
      })
      .pipe(
        tap(({ access }) => {
          localStorage.setItem(this.accessTokenKey, access);
          this.loggedInSignal.set(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.loggedInSignal.set(false);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private storeTokens(tokenPair: TokenPair): void {
    localStorage.setItem(this.accessTokenKey, tokenPair.access);
    localStorage.setItem(this.refreshTokenKey, tokenPair.refresh);
    this.loggedInSignal.set(true);
  }
}
