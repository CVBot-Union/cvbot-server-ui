import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Lookup} from '../models/LookupResponse';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient) { }

  getUIDByName = (name: string): Observable<Lookup> => {
    return this.http.get<Lookup>(environment.apiBase + '/lookup/display_name/' + name);
  }
}
