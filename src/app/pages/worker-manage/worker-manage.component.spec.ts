import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerManageComponent } from './worker-manage.component';

describe('WorkerManageComponent', () => {
  let component: WorkerManageComponent;
  let fixture: ComponentFixture<WorkerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
