import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DownloadOutline,
  InfoCircleOutline,
  DashboardOutline,
  RetweetOutline,
  PlusOutline,
  TwitterOutline,
  UserOutline,
  CloudUploadOutline,
  DeleteOutline,
  ArrowLeftOutline,
  LockOutline,
  PoweroffOutline,
  EyeInvisibleOutline,
  NodeExpandOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline,
  CloudUploadOutline, DeleteOutline, InfoCircleOutline,
  ArrowLeftOutline, UserOutline, LockOutline, PoweroffOutline,
  EyeInvisibleOutline, PlusOutline, DownloadOutline,
  DashboardOutline, NodeExpandOutline, RetweetOutline, TwitterOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
