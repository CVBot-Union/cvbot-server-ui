import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AllRTGroup, RTGroupDetail} from '../models/RTGroupResponse';

@Injectable({
  providedIn: 'root'
})
export class RtgroupService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRTGroups = (): Observable<AllRTGroup> => {
    return this.http.get<AllRTGroup>(environment.apiBase + '/rtgroup/');
  }

  getRTGroupByID = (id: string): Observable<RTGroupDetail> => {
    return this.http.get<RTGroupDetail>(environment.apiBase + '/rtgroup/' + id);
  }
}
