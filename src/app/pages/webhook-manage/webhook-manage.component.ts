import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebhookService} from '../../services/webhook.service';
import {ResponseEntity} from '../../models/WebhookResponse';
import {NzAlertComponent} from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-webhook-manage',
  templateUrl: './webhook-manage.component.html',
  styleUrls: ['./webhook-manage.component.scss']
})
export class WebhookManageComponent implements OnInit {
  constructor(
    private webhookService: WebhookService
  ) { }

  webhookList: ResponseEntity[] | ResponseEntity = [];
  alertText = '';
  isModalVisible = false;
  isOkLoading = false;
  isCancelDisabled = false;
  modalText = '';
  urlToDelete = '';

  webhookName = '';
  webhookURL = '';

  URLPattern = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/);

  private fetchAllWebhooks = () => {
    this.webhookService.getAllWebhooks()
      .subscribe(res => {
        this.webhookList = res.response;
      }, error => {
        this.alertText = '获取钩子时出现错误:' + error.message;
      });

  }

  showDeleteModal = (webhook: ResponseEntity) => {
    this.isModalVisible = true;
    this.modalText = `真的要删除 ${webhook.url} 吗?`;
    this.urlToDelete = webhook.url;
  }

  dismissModal = () => {
    this.isModalVisible = !this.isModalVisible;
    this.urlToDelete = '';
  }

  OkDeleteWebhook = () => {
    this.deleteWebhook(this.urlToDelete);
  }

  createWebhook = () => {
    if (this.webhookURL === '' || this.webhookName === ''){
      this.alertText = '钩子信息不完整';
      return;
    }
    if (!this.URLPattern.test(this.webhookURL)){
      this.alertText = '钩子URL不正确';
      return;
    }

    this.isOkLoading = true;
    this.webhookService.createNewWebhook(this.webhookName, this.webhookURL)
      .subscribe(res => {
        this.isOkLoading = false;
        this.webhookName = '';
        this.webhookURL = '';
        this.fetchAllWebhooks();
      }, error => {
        this.alertText = '创建钩子时出现错误:' + error.message;
      });
  }

  private deleteWebhook = (url: string) => {
    this.isOkLoading = true;
    this.isCancelDisabled = true;
    this.webhookService.deleteWebhook(url)
      .subscribe(res => {
        this.isOkLoading = false;
        this.isModalVisible = false;
        if (res.response.db.deletedCount === 0) {
          this.alertText = '未删除钩子';
          return;
        }
        this.fetchAllWebhooks();
      }, error => {
        this.isOkLoading = false;
        this.isModalVisible = false;
        this.alertText = '删除钩子时出现错误:' + error.message;
      });
}

  ngOnInit(): void {
    this.fetchAllWebhooks();
  }

}
