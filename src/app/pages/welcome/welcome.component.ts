import {Component, OnInit} from '@angular/core';
import {StatService} from '../../services/stat.service';
import {StatResponse} from '../../models/StatResponse';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  statInfo: StatResponse = {
    trackerCount: -1,
    tweetCount: -1,
    rtgroupCount: -1,
    userCount: -1
  };

  constructor(
    private statService: StatService,
    private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getAllStats();
  }

  private getAllStats = () => {
    this.statService.getAllStat()
      .subscribe(res => {
        this.statInfo = res.response;
      }, error => {
        this.messageService.warning('无法获取服务器统计: ' + error.message);
      });
  }

}
