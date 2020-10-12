import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {SlimResponse} from '../../models/UserResponse';
import {AuthService} from '../../services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-rtgroup-user-manage',
  templateUrl: './rtgroup-user-manage.component.html',
  styleUrls: ['./rtgroup-user-manage.component.scss']
})
export class RtgroupUserManageComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NzNotificationService
  ) { }

  isDetailLoading = false;
  isPosting = false;
  alertText = '';
  userLists: SlimResponse[] = [];
  currentUserID = localStorage.getItem('uid');

  username = '';
  password: '';
  isPasswordVisible = false;
  ngOnInit(): void {
    this.fetchAllUsers();
  }

  onCreateUser = () => {
    this.createUser(this.username, this.password);
  }

  private createUser = (username: string, password: string) => {
    this.isPosting = false;
    this.authService.createUser(username, password)
      .subscribe(res => {
        this.isPosting = false;
        this.fetchAllUsers();
        this.username = '';
        this.password = '';
      }, error => {
        this.isPosting = false;
        this.alertText = '创建用户时出现错误: ' + error.response.response;
      });
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

  onDeleteUser = (id: string) => {
    this.deleteUser(id);
  }

  private deleteUser = (id: string) => {
    this.userService.deleteUserByID(id)
      .subscribe(res => {
        this.isDetailLoading = false;
        if (res.response.user.deletedCount === 0) {
          this.alertText = '未删除用户';
          return;
        }
        this.notificationService.success(
          '删除成功',
          '请前往转推组管理内清理用户遗留'
        );
        this.fetchAllUsers();
      }, error => {
        this.isDetailLoading = false;
        this.alertText = '删除人员时出错: ' + error.message;
      });
  }
}
