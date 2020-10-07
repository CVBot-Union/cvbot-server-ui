import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookManageComponent} from './webhook-manage.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WebhookManageComponent', () => {
  let component: WebhookManageComponent;
  let fixture: ComponentFixture<WebhookManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookManageComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
