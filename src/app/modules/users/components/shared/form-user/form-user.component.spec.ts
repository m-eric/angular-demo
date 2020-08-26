import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { FormUserComponent } from './form-user.component';
import { UserRoleColorPipe } from './../../../../../shared/pipes/user-role-color/user-role-color.pipe';
import { UserRolePipe } from './../../../../../shared/pipes/user-role/user-role.pipe';
import { USER_ROLES } from './../../../../../core/models/users/user-roles.model';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserComponent, UserRolePipe, UserRoleColorPipe],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      role: new FormControl(null),
    });
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create input radio for every user role', () => {
    const totalUSerRoles = Object.keys(USER_ROLES).length;
    const inputRadios = fixture.debugElement.queryAll(By.css('input[type="radio"]'))
    expect(totalUSerRoles).toEqual(inputRadios.length);
  });
});
