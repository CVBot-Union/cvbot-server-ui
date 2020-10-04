import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Tracker} from '../models/TrackerResponse';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTrackers = (): Observable<Tracker> => {
    return this.http.get<Tracker>(environment.apiBase + '/tracker/');
  }
}
