import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorizationMode = new BehaviorSubject('login');
  private isAuthenticated: boolean = false;
  private token: string = '';
  private tokenTimer: any;
  private userId: string = '';
  authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  changeAuthorizationMode(value: string): void {
    this.authorizationMode.next(value);
  }

  getAuthStatusListener(): Observable<any> {
    return this.authStatusListener.asObservable();
  }

  signup(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/signup', user)
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/users/login', { email: email, password: password })
      .subscribe(response => {
        const token = response.token;
        if (token) {
          this.token = token;
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          
          const expirationInDuration = response.expiresIn;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expirationInDuration * 1000)
          this.saveAuthData(token, expirationDate, this.userId);
          this.setAuthTimer(response.expiresIn);
          this.router.navigate(['/']);
        }


      })
  }

  logout() {
    this.isAuthenticated = false;
    this.token = '';
    this.userId = '';
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer as any);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate:Date, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

}
