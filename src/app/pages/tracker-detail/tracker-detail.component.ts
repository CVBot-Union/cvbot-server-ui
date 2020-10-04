import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewTrackerResponse} from '../../models/TrackerResponse';
import {TrackerService} from '../../services/tracker.service';
import {Response} from '../../models/RTGroupResponse';
import {RtgroupService} from '../../services/rtgroup.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tracker-detail',
  templateUrl: './tracker-detail.component.html',
  styleUrls: ['./tracker-detail.component.scss']
})
export class TrackerDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trackerService: TrackerService,
    private rtgroupService: RtgroupService
  ) {
  }

  uid = '';
  alertText = '';
  newNickname = '';

  isUserNotFound = false;
  trackerDetail: NewTrackerResponse;
  rtGroupDetails: Response[] = [];
  rtGroupLists: Response[] = [];
  isDetailLoading = false;

  isAddQQGroupModalVisible = false;
  isChangeNicknameModalVisible = false;
  isAddRTGroupModalVisible = false;
  isOkLoading = false;
  isCancelDisabled = false;
  selectedRTGroups: string[] = [];
  enteredQQGroups: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.uid = param.get('uid');
      this.getTracker(this.uid);
    });
  }

  getTwitterAvatar = (uid: string): string => {
    return environment.apiBase + '/lookup/avatar/id/' + uid;
  }

  onConfirmRemoveRTGroup = (groupID: string) => {
    const idIdx = this.trackerDetail.groups.indexOf(groupID);
    if (idIdx < -1) {
      this.alertText = '无法找到转推组索引';
      return;
    }
    this.trackerDetail.groups.splice(idIdx, 1);
    this.updateTrackerInfo(this.trackerDetail);
  }

  onConfirmRemoveQQGroup = (groupID: string) => {
    const idIdx = this.trackerDetail.qqGroups.indexOf(groupID);
    if (idIdx < -1) {
      this.alertText = '无法找到QQ群索引';
      return;
    }
    this.trackerDetail.qqGroups.splice(idIdx, 1);
    this.updateTrackerInfo(this.trackerDetail);
  }

  private updateTrackerInfo = (updatedInfo: NewTrackerResponse) => {
    this.isCancelDisabled = true;
    this.isOkLoading = true;
    this.isDetailLoading = true;
    this.trackerService.updateTrackerInfo(updatedInfo)
      .subscribe(data => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.dismissModal();
        this.getTracker(this.uid);
      }, error => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.dismissModal();
        this.alertText = '修改Tracker信息时出错: ' + error.error.response;
      });
  }

  dismissModal = () => {
    this.isAddRTGroupModalVisible = false;
    this.isAddQQGroupModalVisible = false;
    this.isChangeNicknameModalVisible = false;
    this.newNickname = '';
    this.selectedRTGroups = [];
    this.enteredQQGroups = [];
  }

  private getTracker = (uid: string) => {
    this.isDetailLoading = true;
    this.trackerService.getTrackerByUID(uid)
      .subscribe(res => {
        this.trackerDetail = res.response;
        this.getRTGroupDetails(this.trackerDetail.groups);
        this.isDetailLoading = false;
      }, error => {
        this.isUserNotFound = true;
        this.alertText = '查找追踪用户时错误: ' + error.message;
      });
  }

  private getRTGroupDetails = (rtgroupIDs: string[]) => {
    this.rtGroupDetails = [];
    for (const id of rtgroupIDs) {
      this.rtgroupService.getRTGroupByID(id)
        .subscribe(res => {
          this.rtGroupDetails.push(res.response);
        });
    }
  }

  private getRTGroupLists = () => {
    this.rtgroupService.getAllRTGroups()
      .subscribe(res => {
        this.rtGroupLists = res.response;
      }, error => {
        this.alertText = '获取转推组时出错: ' + error.message;
      });
  }

  onAddQQGroups = () => {
    this.isAddQQGroupModalVisible = true;
    this.isAddRTGroupModalVisible = false;
    this.isCancelDisabled = false;
  }

  onAddRTGroups = () => {
    this.isAddRTGroupModalVisible = true;
    this.isAddQQGroupModalVisible = false;
    this.isCancelDisabled = false;
    this.getRTGroupLists();
  }

  onNicknameEdit = () => {
    this.isCancelDisabled = false;
    this.isChangeNicknameModalVisible = true;
    this.newNickname = this.trackerDetail.nickname;
  }

  OkNicknameEdit = () => {
    this.trackerDetail.nickname = this.newNickname;
    this.updateTrackerInfo(this.trackerDetail);
  }

  OkAddQQGroups = () => {
    this.trackerDetail.qqGroups = this.enteredQQGroups.concat(this.trackerDetail.qqGroups.filter(item =>
      this.enteredQQGroups.indexOf(item) < 0
    ));
    this.updateTrackerInfo(this.trackerDetail);
  }

  OkAddRTGroups = () => {
    this.trackerDetail.groups = this.selectedRTGroups.concat(this.trackerDetail.groups.filter(item =>
      this.selectedRTGroups.indexOf(item) < 0
    ));
    this.updateTrackerInfo(this.trackerDetail);
  }

  onBack = () => {
    this.router.navigate(['/', 'tracker', 'manage']);
  }

}
