import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NewTracker, NewTrackerResponse, Tracker, TrackerDelete, TrackerGroupEntity} from '../models/TrackerResponse';
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

  getTrackerByUID = (uid: string): Observable<NewTracker> => {
    return this.http.get<NewTracker>(environment.apiBase + '/tracker/' + uid);
  }

  deleteTracker = (uid: string): Observable<TrackerDelete> => {
    return this.http.request<TrackerDelete>('delete', environment.apiBase + '/tracker/', { body: { uid } });
  }

  createNewTracker = (uid: string, displayName: string, nickname: string, qqGroups: string[], groups: TrackerGroupEntity[])
    : Observable<NewTracker> => {
    return this.http.post<NewTracker>(environment.apiBase + '/tracker/', {
      uid, displayName, nickname, qqGroups, groups
    });
  }

  updateTrackerInfo = (updatedInfo: NewTrackerResponse): Observable<NewTracker> => {
    return this.http.patch<NewTracker>(environment.apiBase + '/tracker/' + updatedInfo.uid, { ...updatedInfo } );
  }
}
