import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UserRoleColorPipe } from './../../../../../../shared/pipes/user-role-color/user-role-color.pipe';
import { UserRolePipe } from './../../../../../../shared/pipes/user-role/user-role.pipe';
import { AuthUser } from './../../../../../../core/models/auth/auth-user.model';
import { AuthUserRowComponent } from './auth-user-row.component';

describe('AuthUserRowComponent', () => {
  let component: AuthUserRowComponent;
  let fixture: ComponentFixture<AuthUserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthUserRowComponent, UserRolePipe, UserRoleColorPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserRowComponent);
    component = fixture.componentInstance;
    component.authUser = fakeAuthUser;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show name, email, role', () => {
    const tdFields = fixture.debugElement.queryAll(By.css('td')).slice(0, 3);
    const pipe = new UserRolePipe();
    expect(tdFields[0].nativeElement.innerHTML).toContain(fakeAuthUser.name);
    expect(tdFields[1].nativeElement.innerHTML).toContain(fakeAuthUser.email);
    expect(tdFields[2].nativeElement.innerHTML).toContain(
      pipe.transform(fakeAuthUser.role)
    );
  });

  it('Should show profile link', () => {
    const href = fixture.debugElement
      .query(By.css('td div a'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/profil');
  });
});

const fakeAuthUser: AuthUser = {
  id: 1,
  name: 'Test',
  email: 'test@test.com',
  role: 'SYSADMIN',
};
