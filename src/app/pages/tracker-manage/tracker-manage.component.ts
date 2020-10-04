import { Component, OnInit } from '@angular/core';
import {TrackerService} from '../../services/tracker.service';
import {ResponseEntity} from '../../models/TrackerResponse';
import {LookupService} from '../../services/lookup.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tracker-manage',
  templateUrl: './tracker-manage.component.html',
  styleUrls: ['./tracker-manage.component.scss']
})
export class TrackerManageComponent implements OnInit {

  constructor(
    private trackerService: TrackerService,
    private lookupService: LookupService
  ) { }

  trackerList: ResponseEntity[] = [];
  alertText = '';
  isOkLoading = false;

  ngOnInit(): void {
    this.fetchAllTrackers();
  }

  getTwitterAvatar = (uid: string): string => {
    return environment.apiBase + '/lookup/avatar/id/' + uid;
  }

  private fetchAllTrackers = () => {
    this.isOkLoading = true;
    this.trackerService.getAllTrackers()
      .subscribe(res => {
        this.isOkLoading = false;
        this.trackerList = res.response;
      }, error => {
        this.isOkLoading = false;
        this.alertText = '获取追踪者时出现错误:' + error.message;
      });
  }

}
