import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EditUserDataComponent } from './edit-user-data.component';
import { User } from 'src/app/core/models/users/user.model';
import { AuthUser } from 'src/app/core/models/auth/auth-user.model';
import { UsersService } from './../../../../../core/services/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormUserComponent } from './../../shared/form-user/form-user.component';
import { BtnSubmitStatusComponent } from './../../../../../shared/components/btn-submit-status/btn-submit-status.component';
import { UserRolePipe } from './../../../../../shared/pipes/user-role/user-role.pipe';
import { UserRoleColorPipe } from './../../../../../shared/pipes/user-role-color/user-role-color.pipe';

describe('EditUserDataComponent', () => {
  let component: EditUserDataComponent;
  let fixture: ComponentFixture<EditUserDataComponent>;
  let usersServiceMock: any;
  let authServiceMock: any;

  const fakeUser: User = {
    id: 2,
    name: 'test2',
    email: 'test2@test.com',
    role: 'USER',
  };
  const fakeAuthUser: AuthUser = {
    id: 1,
    name: 'test',
    email: 'test@test.com',
    role: 'SYSADMIN',
  };

  beforeEach(async(() => {
    authServiceMock = {
      user: {
        getValue: jasmine.createSpy().and.returnValue(fakeAuthUser),
      },
    };

    usersServiceMock = {
      getUserByID: jasmine.createSpy().and.returnValue(fakeUser),
      updateUserData: jasmine
        .createSpy()
        .and.returnValue(of({ message: 'success' })),
    };

    TestBed.configureTestingModule({
      declarations: [
        EditUserDataComponent,
        FormUserComponent,
        BtnSubmitStatusComponent,
        UserRolePipe,
        UserRoleColorPipe,
      ],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserDataComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should populate form with user data', () => {
    expect(component.userForm.get('name').value).toEqual(fakeUser.name);
    expect(component.userForm.get('email').value).toEqual(fakeUser.email);
    expect(component.userForm.get('role').value).toEqual(fakeUser.role);
  });

  describe('Form validation', () => {
    it('Name field validation', () => {
      const name = component.userForm.controls['name'];
      name.setValue('');
      expect(name.valid).toBeFalsy();
      name.setValue('Test');
      expect(name.valid).toBeTruthy();
    });

    it('Email field validation', () => {
      const email = component.userForm.controls['email'];
      email.setValue('');
      expect(email.valid).toBeFalsy();
      email.setValue('test');
      expect(email.valid).toBeFalsy();
      email.setValue('test@test.com');
      expect(email.valid).toBeTruthy();
    });

    it('Role validation', () => {
      const role = component.userForm.controls['role'];
      role.setValue('USER');
      expect(role.valid).toBeTruthy();
    });
  });

  describe('Submit', () => {
    it('Submitting a form sends user data', () => {
      const usersService = TestBed.get(UsersService);
      expect(component.userForm.valid).toBeTruthy();
      component.onSubmit();
      expect(usersService.updateUserData).toHaveBeenCalledWith(2, {
        name: 'test2',
        email: 'test2@test.com',
        role: 'USER',
      });
    });

    it('Successful submit sets submitStatus to "success"', () => {
      component.onSubmit();
      expect(component.submitStatus).toEqual('success');
    });

    it('Failed submit sets submitStatus to "error"', () => {
      usersServiceMock.updateUserData = jasmine.createSpy().and.callFake(() => {
        return throwError('error');
      });
      component.onSubmit();
      expect(component.submitStatus).toEqual('error');
    });
  });
});
