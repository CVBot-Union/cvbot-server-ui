import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {BatchUsers, DeleteUser, MetaUser, UserDetail} from '../models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers = (): Observable<BatchUsers> => {
    return this.http.get<BatchUsers>(environment.apiBase + '/user/all');
  }

  getUserDetailByID = (id: string): Observable<UserDetail> => {
    return this.http.get<UserDetail>(environment.apiBase + '/user/' + id);
  }

  getUserMetaByID = (id: string): Observable<MetaUser> => {
    return this.http.get<MetaUser>(environment.apiBase + '/user/' + id + '/meta');
  }

  getCurrentUserDetail = (): Observable<UserDetail> => {
    return this.http.get<UserDetail>(environment.apiBase + '/user/');
  }

  deleteUserByID = (id: string): Observable<DeleteUser> => {
    return this.http.delete<DeleteUser>(environment.apiBase + '/user/' + id);
  }
}
