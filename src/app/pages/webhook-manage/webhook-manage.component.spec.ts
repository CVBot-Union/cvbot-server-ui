import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhookManageComponent } from './webhook-manage.component';

describe('WebhookManageComponent', () => {
  let component: WebhookManageComponent;
  let fixture: ComponentFixture<WebhookManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookManageComponent ]
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
