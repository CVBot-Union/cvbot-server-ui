import {Component, OnInit} from '@angular/core';
import {WebhookService} from '../../services/webhook.service';
import {ResponseEntity} from '../../models/WebhookResponse';

@Component({
  selector: 'app-webhook-manage',
  templateUrl: './webhook-manage.component.html',
  styleUrls: ['./webhook-manage.component.scss']
})
export class WebhookManageComponent implements OnInit {
  constructor(
    private webhookService: WebhookService
  ) { }

  webhookList: ResponseEntity[] = [];
  alertText = '';
  isModalVisible = false;
  isOkLoading = false;
  isCancelDisabled = false;
  modalText = '';
  urlToDelete = '';

  webhookName = '';
  webhookURL = '';

  URLPattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);

  private fetchAllWebhooks = () => {
    this.isOkLoading = true;
    this.webhookService.getAllWebhooks()
      .subscribe(res => {
        this.isOkLoading = false;
        if (Array.isArray(res.response)){
          this.webhookList = res.response;
        }
      }, error => {
        this.isOkLoading = false;
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
    this.isCancelDisabled = false;
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
        this.isCancelDisabled = false;
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
