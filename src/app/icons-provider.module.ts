import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  RetweetOutline,
  TwitterOutline,
  CloudUploadOutline,
  DeleteOutline,
  NodeExpandOutline
} from '@ant-design/icons-angular/icons';

const icons = [MenuFoldOutline, MenuUnfoldOutline,
  CloudUploadOutline, DeleteOutline,
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
