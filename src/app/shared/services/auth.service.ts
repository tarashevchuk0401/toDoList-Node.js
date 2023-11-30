import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorizationMode = new BehaviorSubject('login');

  constructor(private http: HttpClient) { }

  changeAuthorizationMode(value: string): void {
    this.authorizationMode.next(value);
  }

  signup(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/signup', user)
  }
}
