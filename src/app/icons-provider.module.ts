import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  InfoCircleOutline,
  DashboardOutline,
  RetweetOutline,
  TwitterOutline,
  CloudUploadOutline,
  DeleteOutline,
  ArrowLeftOutline,
  NodeExpandOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline,
  CloudUploadOutline, DeleteOutline, InfoCircleOutline,
  ArrowLeftOutline,
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
