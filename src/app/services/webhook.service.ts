import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Webhook, WebhookDelete} from '../models/WebhookResponse';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {

  constructor(
    private http: HttpClient
  ) { }

  getAllWebhooks = (): Observable<Webhook> => {
    return this.http.get<Webhook>(environment.apiBase + '/webhook/');
  }

  deleteWebhook = (url: string): Observable<WebhookDelete> => {
    return this.http.request<WebhookDelete>('delete', environment.apiBase + '/webhook/', { body: { url }});
  }

  createNewWebhook = (name: string, url: string ): Observable<Webhook> => {
    return this.http.post<Webhook>(environment.apiBase + '/webhook', { name, url });
  }
}
