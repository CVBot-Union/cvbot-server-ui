import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RtgroupUserManageComponent} from './rtgroup-user-manage.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NzNotificationModule} from 'ng-zorro-antd/notification';

describe('RtgroupUserManageComponent', () => {
  let component: RtgroupUserManageComponent;
  let fixture: ComponentFixture<RtgroupUserManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgroupUserManageComponent ],
      imports: [HttpClientTestingModule, NzNotificationModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgroupUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
