import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from './services/user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isCollapsed = false;
  isWholePageLinkActive = false;
  wholePageLink = ['/auth/login', '/404'];
  username = '用户';

  routerSub: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: NzMessageService,
    private changeDetectRef: ChangeDetectorRef
  ) { }

  getLocalTimeGreeting = () => {
    const nowTime = new Date();
    const hour = nowTime.getHours();

    if (hour >= 0 && hour < 6) {
      return '清晨好';
    } else if (hour >= 6 && hour < 12) {
      return '早上好';
    } else if (hour === 12) {
      return '中午好';
    } else if (hour > 12 && hour < 18) {
      return '下午好';
    } else if (hour >= 18 && hour < 24) {
      return  '晚上好';
    }else {
      return '您好';
    }
  }

  private subRouteChange = () => {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWholePageLinkActive =
          (this.wholePageLink.indexOf(event.url) !== -1) ||
          (this.wholePageLink.indexOf(event.urlAfterRedirects)) !== -1;
        this.isCollapsed = this.isWholePageLinkActive;
      }
      this.changeDetectRef.detectChanges();
    });
  }

  private getUserInfo = () => {
    if (localStorage.getItem('token') === null) {
      this.messageService.error('未登录, 请登录');
      this.router.navigate(['auth', 'login']);
      return;
    }
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        this.username = res.response.user.username;
      }, error => {
        this.messageService.error('获取登陆状态错误, 请登录');
        if (error.status === 401 || error.status === 403){
          this.router.navigate(['auth', 'login']);
        }
      });
  }

  onLogout = () => {
    localStorage.clear();
    this.router.navigate(['auth', 'login']);
  }

  ngOnInit(): void {
    this.subRouteChange();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.isWholePageLinkActive = false;
    this.routerSub.unsubscribe();
  }
}
