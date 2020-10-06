import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RtgroupService} from '../../services/rtgroup.service';
import {UserService} from '../../services/user.service';
import {ExtendedMembersEntity, MembersEntity, Response} from '../../models/RTGroupResponse';
import {SlimResponse} from '../../models/UserResponse';
import {environment} from '../../../environments/environment';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-rtgroup-detail',
  templateUrl: './rtgroup-detail.component.html',
  styleUrls: ['./rtgroup-detail.component.scss']
})
export class RtgroupDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: NzMessageService,
    private rtgroupService: RtgroupService,
    private userService: UserService
  ) { }

  alertText = '';
  groupID = '';

  availableJoinType = [{
    label: '组员',
    value: 'member'
  }, {
    label: '组长',
    value: 'leader'
  }];

  iconUploadEndpoint = environment.apiBase + '/rtgroup/icon/';
  authToken = localStorage.getItem('token');

  rtGroupDetail: Response;
  usersLists: SlimResponse[] = [];
  isDetailLoading = false;
  isGroupNotFound = false;

  infoEditing = {
    name: false,
    description: false,
    color: false,
  };

  isCancelDisabled = false;
  isOkLoading = false;
  isJoinMemberModalVisible = false;
  selectedUser = '';
  selectedJoinType = this.availableJoinType[0].value;
  userDutyDescription = '';

  membersList: ExtendedMembersEntity[] = [];
  leadersList: ExtendedMembersEntity[] = [];
  invalidUserIDs: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.groupID = param.get('uid');
      this.iconUploadEndpoint = environment.apiBase + '/rtgroup/icon/' + this.groupID;
      this.fetchGroupDetail(this.groupID);
    });
  }

  onBack = () => {
    this.router.navigate(['/', 'rtgroup', 'group', 'manage']);
  }

  onBeforeFileUpload = (file: NzUploadFile, fileList: NzUploadFile[] ): boolean => {
    this.isOkLoading = true;
    this.messageService.loading('上传中');
    return true;
  }

  onFileUpload = (event: NzUploadChangeParam) => {
    if (event.file.status === 'done') {
      this.messageService.success('上传成功');
      this.isOkLoading = false;
      this.fetchGroupDetail(this.groupID);
    } else if (event.file.status === 'error') {
      this.alertText = '上传头像时发生错误: ' + event.file.response;
    }
  }

  onChangeGroupInfo = () => {
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onAddMembers = () => {
    this.isJoinMemberModalVisible = true;
    this.selectedJoinType = this.availableJoinType[0].value;
    this.fetchAllUsers();
  }

  onAddLeaders = () => {
    this.isJoinMemberModalVisible = true;
    this.selectedJoinType = this.availableJoinType[1].value;
    this.fetchAllUsers();
  }

  onRemoveMembers = (id: string) => {
    const idIdx = this.rtGroupDetail.members.map(e => e.id).indexOf(id);
    if (idIdx < -1) {
      this.alertText = '无法找到组员索引';
      return;
    }
    this.rtGroupDetail.members.splice(idIdx, 1);
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onRemoveLeaders = (id: string) => {
    const idIdx = this.rtGroupDetail.leaders.map(e => e.id).indexOf(id);
    if (idIdx < -1) {
      this.alertText = '无法找到组长索引';
      return;
    }
    this.rtGroupDetail.leaders.splice(idIdx, 1);
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onDismissModal = () => {
    this.isJoinMemberModalVisible = false;
  }

  OkAddUsers = () => {
    if (this.userDutyDescription === '') {
      this.userDutyDescription = '成员';
    }
    const builtUser: MembersEntity = {
      _id: undefined,
      dutyDescription: this.userDutyDescription,
      id: this.selectedUser
    };
    switch (this.selectedJoinType){
      case 'leader':
        this.rtGroupDetail.leaders = this.mergeNewUser(builtUser, this.rtGroupDetail.leaders);
        break;
      case 'member':
        this.rtGroupDetail.members = this.mergeNewUser(builtUser, this.rtGroupDetail.members);
        break;
      default:
        break;
    }
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  private mergeNewUser = (newMember: MembersEntity, targetMemberList: MembersEntity[]): MembersEntity[] => {
    const idIdx = targetMemberList.map(e => e.id).indexOf(newMember.id);
    if (idIdx === -1) {
      targetMemberList.push(newMember);
    }
    return targetMemberList;
  }

  private updateRTGroupInfo = (updatedInfo: Response) => {
    this.isCancelDisabled = true;
    this.isOkLoading = true;
    this.isDetailLoading = true;
    this.rtgroupService.updateRTGroup(updatedInfo)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.onDismissModal();
        this.selectedUser = '';
        this.userDutyDescription = '';
        this.fetchGroupDetail(this.groupID);
      }, error => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.onDismissModal();
        this.alertText = '修改转推组信息时出错: ' + error.error.response;
      });
  }

  private fetchAllUsers = () => {
    this.usersLists = [];
    this.userService.getAllUsers()
      .subscribe(res => {
        this.usersLists = res.response;
      }, error => {
        this.alertText = '获取用户时出错: ' + error.message;
      });
  }

  private fetchGroupDetail = (id: string) => {
    this.membersList = [];
    this.leadersList = [];
    this.isDetailLoading = true;
    this.rtgroupService.getRTGroupByID(id)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.rtGroupDetail = res.response;
        this.buildUsersMeta(this.rtGroupDetail.members, 'member');
        this.buildUsersMeta(this.rtGroupDetail.leaders, 'leader');
      }, error => {
        this.isDetailLoading = false;
        this.isGroupNotFound = true;
        this.alertText = '获取转推组时出错: ' + error.message;
      });
  }

  private buildUsersMeta = (userIDs: MembersEntity[], type: 'member' | 'leader') => {
    userIDs.map(elm => {
      this.userService.getUserMetaByID(elm.id)
        .subscribe(res => {
          switch (type){
            case 'leader':
              this.leadersList.push({
                ...elm, username: res.response.username, isInvalid: false
              });
              break;
            case 'member':
              this.membersList.push({
                ...elm, username: res.response.username, isInvalid: false
              });
              break;
            default:
              break;
          }
        }, error => {
          switch (type){
            case 'leader':
              this.leadersList.push({
                ...elm, username: '失效', isInvalid: false
              });
              break;
            case 'member':
              this.membersList.push({
                ...elm, username: '失效', isInvalid: false
              });
              break;
            default:
              break;
          }
          this.invalidUserIDs.push(elm.id);
        });
    });
  }

}
