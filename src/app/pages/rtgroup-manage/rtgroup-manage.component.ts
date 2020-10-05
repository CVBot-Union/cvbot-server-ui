import { Component, OnInit } from '@angular/core';
import {Response} from '../../models/RTGroupResponse';
import {RtgroupService} from '../../services/rtgroup.service';

@Component({
  selector: 'app-rtgroup-manage',
  templateUrl: './rtgroup-manage.component.html',
  styleUrls: ['./rtgroup-manage.component.scss']
})
export class RtgroupManageComponent implements OnInit {

  constructor(
    private rtgroupService: RtgroupService
  ) { }

  isDetailLoading = false;
  alertText = '';
  rtgroupLists: Response[] = [];

  ngOnInit(): void {
    this.fetchAllRTGroups();
  }

  private fetchAllRTGroups = () => {
    this.isDetailLoading = true;
    this.rtgroupService.getAllRTGroups()
      .subscribe(res => {
        this.isDetailLoading = false;
        this.rtgroupLists = res.response;
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '获取转推组时出错: ' + error.message;
      });
  }

}
