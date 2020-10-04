import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {WebhookManageComponent} from './pages/webhook-manage/webhook-manage.component';
import {WebhookHistoryComponent} from './pages/webhook-history/webhook-history.component';
import {TrackerManageComponent} from './pages/tracker-manage/tracker-manage.component';
import {RtgroupManageComponent} from './pages/rtgroup-manage/rtgroup-manage.component';
import {RtgroupUserManageComponent} from './pages/rtgroup-user-manage/rtgroup-user-manage.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'webhook/manage', component: WebhookManageComponent},
  { path: 'webhook/history', component: WebhookHistoryComponent},
  { path: 'tracker/manage', component: TrackerManageComponent},
  { path: 'rtgroup/group/manage', component: RtgroupManageComponent },
  { path: 'rtgroup/user/manage', component: RtgroupUserManageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
