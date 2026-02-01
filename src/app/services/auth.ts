import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, UserAuthResponse } from '../models/userModel';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
// import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = `${environment.apiUrl}/auth`;
  // private url = 'http://localhost:3000/api/auth'; // לעשות עם קובץ סביבה (.env)???
  private httpClient = inject(HttpClient);
  private userBehaviorSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userBehaviorSubject.asObservable();
  private router = inject(Router);

  // public isLoggedIn$: Observable<boolean> = this.user$.pipe(
  //   map(user => !!user)
  // );

  // constructor() {
  //   const userStr = localStorage.getItem('user');
  //   if (userStr) {
  //     try {
  //       const user: User = JSON.parse(userStr);
  //       this.userBehaviorSubject.next(user);
  //     } catch (error) {
  //       this.userBehaviorSubject.next(null);
  //       console.error('Error parsing user from localStorage:', error);
  //     }
  //   }
  // }

  getToken(): string | null {
    console.log('in getToken', localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  register(user: User) {
    console.log('in register service');
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
    console.log('in login service');
    return this.httpClient.post<UserAuthResponse>(this.url + '/login', user).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.userBehaviorSubject.next(response.user);
        // this.userBehaviorSubject.next(response.user); // אם רוצים לעדכן את המשתמש הנוכחי ???
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
    this.userBehaviorSubject.next(null);
    this.router.navigate(['/login']);
  }
}
