import { Component, OnInit } from '@angular/core';
import {WorkerService} from '../../services/worker.service';

@Component({
  selector: 'app-worker-manage',
  templateUrl: './worker-manage.component.html',
  styleUrls: ['./worker-manage.component.scss']
})
export class WorkerManageComponent implements OnInit {

  workerStatus: 'RUNNING' | 'KILLED' | 'RESTARTING' | 'UNKNOWN';
  isRestarting = false;
  alertText = '';
  isStatusLoading = true;
  constructor(
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.fetchWorkerStatus();
  }

  onRefresh = () => {
    this.fetchWorkerStatus();
  }

  onKill = () => {
    this.stopWorker();
  }

  onStart = () => {
    this.startWorker();
  }

  private fetchWorkerStatus = () => {
    this.isStatusLoading = true;
    this.workerService.getWorkerStatus()
      .subscribe(data => {
        this.isStatusLoading = false;
        this.workerStatus = data.response.killed ? 'KILLED' : 'RUNNING';
      }, error => {
        this.isStatusLoading = false;
        this.workerStatus = 'UNKNOWN';
        this.alertText = '获取Worker状态时遇到错误: ' + error.message;
      });
  }

  private stopWorker = () => {
    this.isStatusLoading = true;
    this.workerService.killWorker()
      .subscribe(data => {
        this.isStatusLoading = false;
        if (data.response.error) {
          this.alertText = data.response.error;
          this.workerStatus = 'UNKNOWN';
        }else {
          this.workerStatus = data.response.killed ? 'KILLED' : 'RUNNING';
        }
      }, error => {
        this.isStatusLoading = false;
        this.workerStatus = 'UNKNOWN';
        this.alertText = '获取Worker状态时遇到错误: ' + error.message;
      });
  }

  private startWorker = () => {
    this.isStatusLoading = true;
    this.workerService.startWorker()
      .subscribe(data => {
        if (data.response.error) {
          this.alertText = data.response.error;
          this.workerStatus = 'UNKNOWN';
        }else {
          this.isStatusLoading = false;
          this.workerStatus = 'RUNNING';
        }
      }, error => {
        this.isStatusLoading = false;
        this.workerStatus = 'UNKNOWN';
        this.alertText = '获取Worker状态时遇到错误: ' + error.message;
      });
  }

}
