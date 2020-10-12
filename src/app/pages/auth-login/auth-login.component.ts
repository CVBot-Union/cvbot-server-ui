import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  validateForm!: FormGroup;
  isAuthorizing = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    this.checkCurrentUserDetail();
  }

  private checkCurrentUserDetail = () => {
    if (localStorage.getItem('token') === null) {
      return;
    }
    this.isAuthorizing = true;
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        this.isAuthorizing = false;
        if (res.success) {
          this.messageService.info('您已经登录');
          this.router.navigate(['welcome']);
        }
      }, error => {
        this.isAuthorizing = false;
        return;
      });
  }

  submitForm = (loginForm) => {
    this.getAuthToken(loginForm.username, loginForm.password);
  }

  private getAuthToken = (username: string, password: string) => {
    this.isAuthorizing = true;
    this.authService.login(username, password)
      .subscribe(res => {
        this.isAuthorizing = false;
        if (res.response.token) {
          localStorage.setItem('token', res.response.token);
          localStorage.setItem('uid', res.response.uid);
          this.router.navigate(['']);
          window.location.replace('');
        }
      }, error => {
        this.isAuthorizing = false;
        if (error.status === 403 || error.status === 401) {
          this.messageService.error('登录错误,请检查用户名和密码');
        }else{
          this.messageService.error('未知登录错误');
        }
      });
  }
}
