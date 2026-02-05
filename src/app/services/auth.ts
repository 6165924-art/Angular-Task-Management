import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, UserAuthResponse } from '../models/userModel';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = `${environment.apiUrl}/auth`;
  private httpClient = inject(HttpClient);
  private userBehaviorSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userBehaviorSubject.asObservable();
  private router = inject(Router);

  constructor() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        this.userBehaviorSubject.next(user);
      }
      catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(user: User) {
    return this.httpClient.post<UserAuthResponse>(this.url + '/register', user).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.userBehaviorSubject.next(response.user);
        // this.userBehaviorSubject.next(response.user); // אם רוצים לעדכן את המשתמש הנוכחי ???
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  login(user: User) {
    return this.httpClient.post<UserAuthResponse>(this.url + '/login', user).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.userBehaviorSubject.next(response.user);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('task');
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }
}
