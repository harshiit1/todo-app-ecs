import { Injectable } from '@angular/core';
import { UserModel } from '../../shared/models/user/user-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient) {}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  login(paylaod: UserModel): Observable<any> {
    return this.http.post<any>(``, paylaod);
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}
