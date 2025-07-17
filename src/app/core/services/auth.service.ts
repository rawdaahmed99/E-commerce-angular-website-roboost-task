import { environment } from './../environments/environment';
import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private currentUserSignal = signal<AuthResponse | null>(null);
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly currentUser = computed(() => this.currentUserSignal());

  private tokenTimer: any;

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}auth/login`, credentials).pipe(
      tap(response => {
        this.setUser(response);
      })
    );
  }

  register(data: { username: string; email: string; password: string }): Observable<AuthResponse> {
    const fakeResponse: AuthResponse = {
      id: new Date().getTime(), // Fake ID
      token: 'fake-jwt-token-for-registration',
      username: data.username,
      email: data.email,
      firstName: 'New',
      lastName: 'User',
      gender: 'male',
      image: 'https://dummyimage.com/100x100/000/fff&text=User',
      expiresIn: 3600,
    };
    return of(fakeResponse).pipe(
      delay(5000),
      tap(response => {
        this.setUser(response);
      })
    );
  }

  setUser(response: AuthResponse): void {
    this.currentUserSignal.set(response);
    const expiresInDuration = response.expiresIn || 3600;
    this.startAutoLogout(expiresInDuration);

    localStorage.setItem('userToken', response.token);
    localStorage.setItem('userInfo', JSON.stringify(response));

    this.router.navigate(['/home']);
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }

    this.router.navigate(['/auth/login']);
  }

  private startAutoLogout(durationInSeconds: number): void {
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, durationInSeconds * 1000);
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('userToken');
    const userInfo = localStorage.getItem('userInfo');

    if (token && userInfo) {
      try {
        const parsedUser: AuthResponse = JSON.parse(userInfo);
        this.currentUserSignal.set(parsedUser);
        const expiresIn = parsedUser.expiresIn || 3600;
        this.startAutoLogout(expiresIn);
      } catch (error) {
        console.error('Error parsing user info from storage', error);
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
