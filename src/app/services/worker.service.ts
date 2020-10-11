import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Worker} from '../models/WorkerResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private http: HttpClient
  ) { }

  getWorkerStatus = (): Observable<Worker> => {
    return this.http.get<Worker>(environment.apiBase + '/setting/worker');
  }

  killWorker = (): Observable<Worker> => {
    return this.http.patch<Worker>(environment.apiBase + '/setting/worker', { });
  }

  startWorker = (): Observable<Worker> => {
    return this.http.post<Worker>(environment.apiBase + '/setting/worker', { });
  }
}
