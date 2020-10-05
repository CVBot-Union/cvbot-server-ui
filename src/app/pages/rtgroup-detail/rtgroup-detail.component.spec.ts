import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtgroupDetailComponent } from './rtgroup-detail.component';

describe('RtgroupDetailComponent', () => {
  let component: RtgroupDetailComponent;
  let fixture: ComponentFixture<RtgroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgroupDetailComponent ]
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
