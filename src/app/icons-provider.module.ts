import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  InfoCircleOutline,
  DashboardOutline,
  RetweetOutline,
  TwitterOutline,
  UserOutline,
  CloudUploadOutline,
  DeleteOutline,
  ArrowLeftOutline,
  NodeExpandOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline,
  CloudUploadOutline, DeleteOutline, InfoCircleOutline,
  ArrowLeftOutline, UserOutline,
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
