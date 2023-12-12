// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  signIn(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signin`, user);
  }

  signUp(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }
}
