import {Component, OnInit} from '@angular/core';
import {TrackerService} from '../../services/tracker.service';
import {ResponseEntity, TrackerGroupEntity} from '../../models/TrackerResponse';
import {LookupService} from '../../services/lookup.service';
import {environment} from '../../../environments/environment';
import {RtgroupService} from '../../services/rtgroup.service';
import {Response} from '../../models/RTGroupResponse';

@Component({
  selector: 'app-tracker-manage',
  templateUrl: './tracker-manage.component.html',
  styleUrls: ['./tracker-manage.component.scss']
})
export class TrackerManageComponent implements OnInit {

  constructor(
    private trackerService: TrackerService,
    private lookupService: LookupService,
    private rtgroupService: RtgroupService
  ) { }

  trackerList: ResponseEntity[] = [];
  alertText = '';
  isOkLoading = false;
  isModalVisible = false;
  isCancelDisabled = false;
  trackerToDelete = '';
  modalText = '';

  rtgroupLists: Response[] = [];

  isCreateDisabled = true;
  isLookupDisabled = false;
  isSaveGroupSelect = false;

  selectedRTGroups = [];
  enteredQQGroups = [];
  twitterUsername = '';
  twitterUID = '';
  twitterNickname = '';
  groupNickname = '';
  ngOnInit(): void {
    this.fetchAllTrackers();
    this.fetchAllRTGroups();
  }

  showDeleteModal = (tracker: ResponseEntity) => {
    this.isModalVisible = true;
    this.modalText = `真的要删除 @${tracker.displayName}(${tracker.nickname}) 吗?`;
    this.trackerToDelete = tracker.uid;
  }

  getTwitterAvatar = (uid: string): string => {
    return environment.apiBase + '/lookup/avatar/id/' + uid;
  }

  dismissModal = () => {
    this.isModalVisible = !this.isModalVisible;
    this.trackerToDelete = '';
  }

  OkDeleteTracker = () => {
    this.deleteTracker(this.trackerToDelete);
  }

  private fetchAllRTGroups = () => {
    this.isOkLoading = true;
    this.rtgroupService.getAllRTGroups()
      .subscribe(res => {
        this.rtgroupLists = res.response;
        this.isOkLoading = false;
      }, error => {
        this.isOkLoading = false;
        this.alertText = '获取转推组时出错: ' + error.message;
      });
  }

  private deleteTracker = (uid: string) => {
    this.isOkLoading = true;
    this.isCancelDisabled = true;
    this.trackerService.deleteTracker(uid)
      .subscribe(res => {
        this.isOkLoading = false;
        this.isModalVisible = false;
        this.isCancelDisabled = false;
        if (res.response.deletedCount === 0) {
          this.alertText = '未删除追踪用户';
        }
        this.fetchAllTrackers();
      }, error => {
        this.isOkLoading = false;
        this.isModalVisible = false;
        this.alertText = '删除追踪用户时出现错误:' + error.message;
      });
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

  onUIDLookup = () => {
    if (this.twitterUsername === '') {
      this.alertText = '请输入Twitter用户名';
      return;
    }
    this.getUIDByUsername(this.twitterUsername);
  }

  onNewTrackerCreate = () => {
    const newGroups: TrackerGroupEntity[] = [];
    this.selectedRTGroups.map(elm => {
      newGroups.push({
        id: elm,
        nickname: this.groupNickname
      });
    });
    this.createNewTracker(this.twitterUID, this.twitterUsername, this.groupNickname, this.enteredQQGroups, newGroups);
  }

  private createNewTracker = (uid: string, displayName: string, nickname: string, qqGroups: string[], groups: TrackerGroupEntity[]) => {
    this.alertText = '';
    this.isOkLoading = true;
    this.isLookupDisabled = true;
    this.isCreateDisabled = true;
    this.trackerService.createNewTracker(uid, displayName, nickname, qqGroups, groups)
      .subscribe(res => {
        this.isOkLoading = false;
        this.isLookupDisabled = false;
        this.twitterUID = '';
        this.twitterUsername = '';
        this.groupNickname = '';
        if (!this.isSaveGroupSelect){
          this.enteredQQGroups = [];
          this.selectedRTGroups = [];
        }
        if (res.success){
          this.fetchAllTrackers();
        }
      }, error => {
        this.isOkLoading = false;
        this.isLookupDisabled = false;
        this.alertText = '添加追踪用户时出现错误:' + error.error.response;
      });
  }

  onUsernameChange = () => {
    this.isCreateDisabled = true;
    this.isLookupDisabled = false;
    this.twitterUID = '';
  }

  private getUIDByUsername = (name: string) => {
    this.isLookupDisabled = true;
    this.lookupService.getUIDByName(name)
      .subscribe(res => {
        this.isCreateDisabled = false;
        this.twitterUID = res.response.id;
        this.twitterNickname = res.response.name;
        if (this.groupNickname === '') {
          this.groupNickname = this.twitterNickname;
        }
      }, error => {
        this.isLookupDisabled = false;
        this.alertText = '查询UID时出现错误: ' + error.message;
      });
  }

}
