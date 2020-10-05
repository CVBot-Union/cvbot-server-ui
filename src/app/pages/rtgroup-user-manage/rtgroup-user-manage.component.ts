import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {SlimResponse} from '../../models/UserResponse';

@Component({
  selector: 'app-rtgroup-user-manage',
  templateUrl: './rtgroup-user-manage.component.html',
  styleUrls: ['./rtgroup-user-manage.component.scss']
})
export class RtgroupUserManageComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  isDetailLoading = false;
  alertText = '';
  userLists: SlimResponse[] = [];
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  private fetchAllUsers = () => {
    this.isDetailLoading = true;
    this.userService.getAllUsers()
      .subscribe(res => {
        this.isDetailLoading = false;
        if (Array.isArray(res.response)){
          this.userLists = res.response;
        }
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '获取人员时出错: ' + error.message;
      });
  }
}
