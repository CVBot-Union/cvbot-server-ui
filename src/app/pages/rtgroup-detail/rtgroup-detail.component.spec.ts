import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RtgroupDetailComponent} from './rtgroup-detail.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NzMessageModule} from 'ng-zorro-antd/message';

describe('RtgroupDetailComponent', () => {
  let component: RtgroupDetailComponent;
  let fixture: ComponentFixture<RtgroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgroupDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, NzMessageModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
