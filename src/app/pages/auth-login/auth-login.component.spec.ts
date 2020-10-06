import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLoginComponent } from './auth-login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {NzMessageServiceModule} from 'ng-zorro-antd/message';
import {NzOverlayModule} from 'ng-zorro-antd/core/overlay';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule,
        ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
