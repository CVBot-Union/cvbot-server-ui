import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import { WebhookManageComponent } from './pages/webhook-manage/webhook-manage.component';
import { TrackerManageComponent } from './pages/tracker-manage/tracker-manage.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzInputModule} from 'ng-zorro-antd/input';
import { RtgroupManageComponent } from './pages/rtgroup-manage/rtgroup-manage.component';
import { RtgroupUserManageComponent } from './pages/rtgroup-user-manage/rtgroup-user-manage.component';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { TrackerDetailComponent } from './pages/tracker-detail/tracker-detail.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {HttpconfigInterceptor} from './interceptor/httpconfig.interceptor';
import { RtgroupDetailComponent } from './pages/rtgroup-detail/rtgroup-detail.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzNotificationServiceModule} from 'ng-zorro-antd/notification';
import {NzMessageServiceModule} from 'ng-zorro-antd/message';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {ColorPickerModule} from 'ngx-color-picker';
import { WorkerManageComponent } from './pages/worker-manage/worker-manage.component';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WebhookManageComponent,
    TrackerManageComponent,
    RtgroupManageComponent,
    RtgroupUserManageComponent,
    TrackerDetailComponent,
    NotFoundComponent,
    RtgroupDetailComponent,
    AuthLoginComponent,
    WorkerManageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzListModule,
        NzAlertModule,
        NzModalModule,
        NzButtonModule,
        NzDividerModule,
        NzInputModule,
        NzSkeletonModule,
        NzTagModule,
        NzPageHeaderModule,
        NzResultModule,
        NzBadgeModule,
        NzAvatarModule,
        NzTypographyModule,
        NzFormModule,
        NzSelectModule,
        NzEmptyModule,
        NzSwitchModule,
        NzMessageServiceModule,
        NzPopconfirmModule,
        NzNotificationServiceModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzSpinModule,
        NzDescriptionsModule,
        NzUploadModule,
        ColorPickerModule,
        NzProgressModule,
        NzStatisticModule
    ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi: true},
    NzModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
