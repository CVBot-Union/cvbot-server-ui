import { Component, OnInit } from '@angular/core';
import {MembersEntity, Response} from '../../models/RTGroupResponse';
import {RtgroupService} from '../../services/rtgroup.service';
import {UserService} from '../../services/user.service';
import {SlimResponse} from '../../models/UserResponse';

@Component({
  selector: 'app-rtgroup-manage',
  templateUrl: './rtgroup-manage.component.html',
  styleUrls: ['./rtgroup-manage.component.scss']
})
export class RtgroupManageComponent implements OnInit {

  constructor(
    private rtgroupService: RtgroupService,
    private userService: UserService
  ) { }

  isDetailLoading = false;
  alertText = '';
  rtgroupLists: Response[] = [];
  userLists: SlimResponse[] = [];

  selectedMembers: string[] = [];
  selectedLeaders: string[] = [];
  newRTGroupName = '';
  newRTGroupDescription = '';
  isSaveMembersAndLeaders = false;
  ngOnInit(): void {
    this.fetchAllRTGroups();
    this.fetchAllUsers();
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

  private fetchAllUsers = () => {
    this.isDetailLoading = true;
    this.userService.getAllUsers()
      .subscribe(res => {
        this.isDetailLoading = false;
        this.userLists = res.response;
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '获取用户时出错: ' + error.message;
      });
  }

  onDeleteRTGroup = (id: string) => {
    this.deleteRTGroup(id);
  }

  private deleteRTGroup = (id: string) => {
    this.isDetailLoading = true;
    this.rtgroupService.deleteRTGroup(id)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.fetchAllRTGroups();
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '删除转推组时出错: ' + error.message;
      });
  }

  onCreateRTGroup = () => {
    const remappedMembers = this.remapQuickAddUser(this.selectedMembers);
    const remappedLeaders = this.remapQuickAddUser(this.selectedLeaders);
    this.createRTGroup(this.newRTGroupName, this.newRTGroupDescription, remappedMembers, remappedLeaders);
  }

  private remapQuickAddUser = (idArray: string[]): MembersEntity[] => {
    const remappedArray = [];
    for (const id of idArray) {
      remappedArray.push({
        id, dutyDescription: '用户'
      });
    }
    return remappedArray;
  }

  private createRTGroup = (name: string, description: string, members: MembersEntity[], leaders: MembersEntity[]) => {
    this.isDetailLoading = true;
    this.rtgroupService.createRTGroup(name, description, members, leaders)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.newRTGroupName = '';
        this.newRTGroupDescription = '';
        if (!this.isSaveMembersAndLeaders) {
          this.selectedMembers = [];
          this.selectedLeaders = [];
        }
        this.fetchAllRTGroups();
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '添加转推组时出错: ' + error.error.response;
      });
  }

}
