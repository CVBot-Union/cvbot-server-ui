import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewTrackerResponse, TrackerGroupEntity} from '../../models/TrackerResponse';
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
  isChangeGroupNicknameVisible = false;
  isOkLoading = false;
  isCancelDisabled = false;
  selectedRTGroups: string[] = [];
  enteredQQGroups: string[] = [];
  enteredGroupNickname = '';
  targetGroupNicknameEdit = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.uid = param.get('uid');
      this.getTracker(this.uid);
    });
  }

  getTwitterAvatar = (uid: string): string => {
    return environment.apiBase + '/lookup/avatar/id/' + uid + '.png';
  }

  onConfirmRemoveRTGroup = (groupID: string) => {
    const idIdx = this.trackerDetail.groups.map(e => e.id).indexOf(groupID);
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
    this.isChangeGroupNicknameVisible = false;
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

  private getRTGroupDetails = (rtgroups: TrackerGroupEntity[]) => {
    this.rtGroupDetails = [];
    for (const group of rtgroups) {
      this.rtgroupService.getRTGroupByID(group.id)
        .subscribe(res => {
          const nickIdx = this.trackerDetail.groups.map(e => e.id).indexOf(group.id);
          this.rtGroupDetails.push({
            trackerUsername: nickIdx > -1 ? this.trackerDetail.groups[nickIdx].nickname : '',
            ...res.response
          });
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

  onGroupNicknameEdit = (currentNickname: string, targetGroupID: string) => {
    this.isCancelDisabled = false;
    this.isChangeGroupNicknameVisible = true;
    this.enteredGroupNickname = currentNickname !== '' ? currentNickname : this.trackerDetail.nickname;
    this.targetGroupNicknameEdit = targetGroupID;
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

  OkChangeGroupNickname = () => {
    const nickIdx = this.trackerDetail.groups.map(e => e.id).indexOf(this.targetGroupNicknameEdit);
    if (nickIdx < -1) {
      this.alertText = '无法找到转推组索引';
      return;
    }
    this.trackerDetail.groups[nickIdx].nickname = this.enteredGroupNickname;
    this.enteredGroupNickname = '';
    this.updateTrackerInfo(this.trackerDetail);
  }

  OkAddRTGroups = () => {
    const groupArray: TrackerGroupEntity[] = [];
    this.selectedRTGroups.map(elm => {
      if (this.trackerDetail.groups.map(e => e.id).indexOf(elm) < 0) {
        groupArray.push({
          id: elm, nickname: this.trackerDetail.nickname
        });
      }
    });
    this.trackerDetail.groups = this.trackerDetail.groups.concat(groupArray);
    this.updateTrackerInfo(this.trackerDetail);
  }

  onBack = () => {
    this.router.navigate(['/', 'tracker', 'manage']);
  }

}
