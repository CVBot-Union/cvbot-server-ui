import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {StatResponseRootObject} from '../models/StatResponse';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStat = (): Observable<StatResponseRootObject> => {
    return this.http.get<StatResponseRootObject>(environment.apiBase + '/stat/');
  }
}
