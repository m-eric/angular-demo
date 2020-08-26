import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersListComponent } from './users-list.component';
import { AuthService } from './../../../../../core/services/auth/auth.service';
import { UsersService } from './../../../../../core/services/users/users.service';
import { UserRowComponent } from './user-row/user-row.component';
import { AuthUserRowComponent } from './auth-user-row/auth-user-row.component';
import { UserRolePipe } from './../../../../../shared/pipes/user-role/user-role.pipe';
import { UserRoleColorPipe } from './../../../../../shared/pipes/user-role-color/user-role-color.pipe';
import { User } from './../../../../../core/models/users/user.model';
import { AuthUser } from './../../../../../core/models/auth/auth-user.model';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsersListComponent,
        AuthUserRowComponent,
        UserRowComponent,
        UserRolePipe,
        UserRoleColorPipe,
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: UsersService, useClass: UsersServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Table rows', () => {
    it('Should render table with row for each user', () => {
      const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
      expect(rows.length).toEqual(component.users.length);
    });

    it('Should render AuthUserRow component for auth user', () => {
      const row = fixture.debugElement.queryAll(By.css('table tbody tr'))[0];
      expect(row.attributes['app-auth-user-row']).toBeDefined();
    });

    it('Should render UserRow component for other (non-auth) users', () => {
      const row = fixture.debugElement.queryAll(By.css('table tbody tr'))[1];
      expect(row.attributes['app-user-row']).toBeDefined();
    });
  });

  describe('Button new user', () => {
    it('Should create', () => {
      const btn = fixture.debugElement.query(By.css('a.btn.btn-info'));
      expect(btn).toBeTruthy();
    });

    it('Click should navigate to new user page', () => {
      const router = TestBed.get(Router);
      spyOn(router, 'navigateByUrl');
      const btn = fixture.debugElement.query(By.css('a.btn.btn-info'));
      btn.nativeElement.click();
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        router.createUrlTree(['/unos']),
        jasmine.any(Object)
      );
    });
  });
});

class UsersServiceStub {
  users: Observable<User[]> = of([
    {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      role: 'SYSADMIN',
    },
    {
      id: 2,
      name: 'test 2',
      email: 'test2@test.com',
      role: 'USER',
    },
  ]);
}

class AuthServiceStub {
  user = {
    getValue(): AuthUser {
      return {
        id: 1,
        name: 'test',
        email: 'test@test.com',
        role: 'SYSADMIN',
      };
    },
  };
}
