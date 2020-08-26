import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { EditUserPasswordComponent } from './edit-user-password.component';
import { User } from 'src/app/core/models/users/user.model';
import { AuthUser } from 'src/app/core/models/auth/auth-user.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormUserComponent } from '../../shared/form-user/form-user.component';
import { BtnSubmitStatusComponent } from 'src/app/shared/components/btn-submit-status/btn-submit-status.component';
import { UserRolePipe } from 'src/app/shared/pipes/user-role/user-role.pipe';
import { UserRoleColorPipe } from 'src/app/shared/pipes/user-role-color/user-role-color.pipe';

describe('EditUserPasswordComponent', () => {
  let component: EditUserPasswordComponent;
  let fixture: ComponentFixture<EditUserPasswordComponent>;
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
      updateUserPassword: jasmine
        .createSpy()
        .and.returnValue(of({ message: 'success' })),
    };

    TestBed.configureTestingModule({
      declarations: [
        EditUserPasswordComponent,
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
    fixture = TestBed.createComponent(EditUserPasswordComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show user data', () => {
    const pName = fixture.debugElement.query(
      By.css('p[class*="user-data-name"]')
    );
    const pEmail = fixture.debugElement.query(
      By.css('p[class*="user-data-email"]')
    );
    const pRole = fixture.debugElement.query(
      By.css('p[class*="user-data-role"]')
    );
    expect(pName.nativeElement.innerHTML).toContain(component.user.name);
    expect(pEmail.nativeElement.innerHTML).toContain(component.user.email);
    expect(pRole.nativeElement.innerHTML.trim()).toContain(
      new UserRolePipe().transform(component.user.role)
    );
  });

  describe('Form validation', () => {
    it('Password field validation', () => {
      const password = component.userForm.controls['password'];
      password.setValue('');
      expect(password.valid).toBeFalsy();
      password.setValue('pass1234');
      expect(password.valid).toBeTruthy();
    });

    it('Confirm password field validation', () => {
      const userForm = component.userForm;
      const password = component.userForm.controls['password'];
      const confirm = component.userForm.controls['confirm'];
      password.setValue('pass1234');
      confirm.setValue('something different');
      expect(userForm.valid).toBeFalsy();
      confirm.setValue('pass1234');
      expect(userForm.valid).toBeTruthy();
    });
  });

  describe('Submit', () => {
    beforeEach(() => {
      component.userForm.controls['password'].setValue('pass1234');
      component.userForm.controls['confirm'].setValue('pass1234');
    });

    it('Submitting a form sends user data', () => {
      const usersService = TestBed.get(UsersService);
      expect(component.userForm.valid).toBeTruthy();
      component.onSubmit();
      expect(usersService.updateUserPassword).toHaveBeenCalledWith(2, {
        password: 'pass1234',
      });
    });

    it('Successful submit sets submitStatus to "success"', () => {
      component.onSubmit();
      expect(component.submitStatus).toEqual('success');
    });

    it('Failed submit sets submitStatus to "error"', () => {
      usersServiceMock.updateUserPassword = jasmine
        .createSpy()
        .and.callFake(() => {
          return throwError('error');
        });
      component.onSubmit();
      expect(component.submitStatus).toEqual('error');
    });
  });
});
