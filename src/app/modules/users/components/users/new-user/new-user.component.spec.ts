import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';

import { NewUserComponent } from './new-user.component';
import { BtnSubmitStatusComponent } from './../../../../../shared/components/btn-submit-status/btn-submit-status.component';
import { UsersService } from 'src/app/core/services/users/users.service';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;
  let usersServiceMock;

  beforeEach(async(() => {
    usersServiceMock = {
      postNewUser: jasmine
        .createSpy()
        .and.returnValue(of({ message: 'success' })),
    };

    TestBed.configureTestingModule({
      declarations: [NewUserComponent, BtnSubmitStatusComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form validation', () => {
    it('Name field validation', () => {
      const name = component.userForm.get('userData.name');
      name.setValue('');
      expect(name.valid).toBeFalsy();
      name.setValue('Test');
      expect(name.valid).toBeTruthy();
    });

    it('Email field validation', () => {
      const email = component.userForm.get('userData.email');
      email.setValue('');
      expect(email.valid).toBeFalsy();
      email.setValue('test123@test.com');
      expect(email.valid).toBeTruthy();
    });

    it('Role validation', () => {
      const role = component.userForm.get('userData.role');
      role.setValue('USER');
      expect(role.valid).toBeTruthy();
    });

    it('Password field validation', () => {
      const password = component.userForm.get('userPassword.password');
      password.setValue('');
      expect(password.valid).toBeFalsy();
      password.setValue('pass1234');
      expect(password.valid).toBeTruthy();
    });

    it('Confirm password field validation', () => {
      const confirm = component.userForm.get('userPassword.confirm');
      const password = component.userForm.get('userPassword.password');
      confirm.setValue('');
      expect(confirm.valid).toBeFalsy();
      confirm.setValue('pass1234');
      expect(confirm.valid).toBeTruthy();
      password.setValue('pass1234');
      expect(component.matchPasswords(component.userForm)).toEqual(null);
      password.setValue('something different');
      expect(component.matchPasswords(component.userForm)).toEqual({
        passwordsNotMatch: true,
      });
    });
  });

  describe('Submit', () => {
    beforeEach(() => {
      const userForm = component.userForm;
      userForm.get('userData.name').setValue('test123');
      userForm.get('userData.email').setValue('test123@test.com');
      userForm.get('userData.role').setValue('USER');
      userForm.get('userPassword.password').setValue('test1234');
      userForm.get('userPassword.confirm').setValue('test1234');
    });

    it('Submitting a form sends user data', () => {
      const usersService = TestBed.get(UsersService);
      expect(component.userForm.valid).toBeTruthy();
      component.onSubmit();
      expect(usersService.postNewUser).toHaveBeenCalledWith({
        name: 'test123',
        email: 'test123@test.com',
        role: 'USER',
        password: 'test1234',
      });
    });

    it('Successful submit sets submitStatus to "success"', () => {
      component.onSubmit();
      expect(component.submitStatus).toEqual('success');
    });

    it('Failed submit sets submitStatus to "error"', () => {
      usersServiceMock.postNewUser = jasmine.createSpy().and.callFake(() => {
        return throwError('error');
      });
      component.onSubmit();
      expect(component.submitStatus).toEqual('error');
    });
  });
});
