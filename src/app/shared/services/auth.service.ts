import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorizationMode = new BehaviorSubject('login');
  private token: string = '';
  private isAuthenticated: boolean = false;
  private tokenTimer: any;
  private userId: string | undefined | null;
  authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getToken(){
    return this.token;
  }

  changeAuthorizationMode(value: string): void {
    this.authorizationMode.next(value);
  }

  getIsAuthenticated(){
    return of(this.isAuthenticated);
  }
  
  getAuthStatusListener(): Observable<any> {
    return this.authStatusListener.asObservable();
  }

  signup(user: User) {
    return this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/users/signup', user)
    .subscribe(response => {
      const token = response.token;
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);

        const expirationInDuration = response.expiresIn;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expirationInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.setAuthTimer(response.expiresIn);
        this.router.navigate(['task']);
      }
    })
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
          this.router.navigate(['task']);
        }
      })
  }

  logout() {
    this.isAuthenticated = false;
    this.token = '';
    this.userId = '';
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer as any);
    this.clearAuthData();
    this.router.navigate(['/']);
  }


  autoAuth() {
    const authInformation = this.getAuthData();
    if(!authInformation){
      return
    }
    const now = new Date();
    // console.log(new Date > now)
    const isInFuture = new Date(authInformation.expirationDate!) > now;
    const expiresIn = new Date(authInformation.expirationDate!).getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token!;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  // >> Local Storage 
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const user = {
      token: localStorage.getItem('token'),
      expirationDate: localStorage.getItem('expirationDate'),
      userId: localStorage.getItem('userId')
    }
    if(!user.token || !user.expirationDate){
      return;
    }

    return user;
  }
  // Local Storage << 


  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

}
