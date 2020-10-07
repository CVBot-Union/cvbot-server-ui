import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebhookHistoryComponent} from './webhook-history.component';

describe('WebhookHistoryComponent', () => {
  let component: WebhookHistoryComponent;
  let fixture: ComponentFixture<WebhookHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhookHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhookHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
