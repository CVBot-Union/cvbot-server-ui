import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AllRTGroup, DeleteRTGroup, MembersEntity, Response, RTGroupDetail} from '../models/RTGroupResponse';

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

  createRTGroup = (name: string, description: string, members: MembersEntity[])
    : Observable<RTGroupDetail> => {
    return this.http.post<RTGroupDetail>(environment.apiBase + '/rtgroup/', {
      name, description, members
    });
  }

  deleteRTGroup = (id: string): Observable<DeleteRTGroup> => {
    return this.http.delete<DeleteRTGroup>(environment.apiBase + '/rtgroup/' + id);
  }

  updateRTGroup = (updatedInfo: Response): Observable<RTGroupDetail> => {
    return this.http.patch<RTGroupDetail>(environment.apiBase + '/rtgroup/' + updatedInfo._id + '', {
      ...updatedInfo
    });
  }

}
