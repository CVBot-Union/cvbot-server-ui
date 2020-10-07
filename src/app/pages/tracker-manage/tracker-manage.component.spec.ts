import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackerManageComponent} from './tracker-manage.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TrackerManageComponent', () => {
  let component: TrackerManageComponent;
  let fixture: ComponentFixture<TrackerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerManageComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
