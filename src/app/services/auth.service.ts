import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AuthLogin} from '../models/AuthResponse';
import {Response} from '../models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login = (username: string, password: string): Observable<AuthLogin> => {
    return this.http.post<AuthLogin>(environment.apiBase + '/auth/login', {
      username, password
    });
  }

  createUser = (username: string, password: string): Observable<Response> => {
    return this.http.post<Response>(environment.apiBase + '/auth/create' , {
      username, password
    });
  }
}
