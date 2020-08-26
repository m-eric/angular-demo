import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UserRoleColorPipe } from './../../../../../../shared/pipes/user-role-color/user-role-color.pipe';
import { UserRolePipe } from './../../../../../../shared/pipes/user-role/user-role.pipe';
import { User } from 'src/app/core/models/users/user.model';
import { UserRowComponent } from './user-row.component';

describe('UserRowComponent', () => {
  let component: UserRowComponent;
  let fixture: ComponentFixture<UserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRowComponent, UserRolePipe, UserRoleColorPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRowComponent);
    component = fixture.componentInstance;
    component.user = fakeUser;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show name, email, role', () => {
    const tdFields = fixture.debugElement.queryAll(By.css('td')).slice(0, 3);
    const pipe = new UserRolePipe();
    expect(tdFields[0].nativeElement.innerHTML).toContain(fakeUser.name);
    expect(tdFields[1].nativeElement.innerHTML).toContain(fakeUser.email);
    expect(tdFields[2].nativeElement.innerHTML).toContain(
      pipe.transform(fakeUser.role)
    );
  });

  it('Should show edit user data link', () => {
    const editDataLink = fixture.debugElement.query(
      By.css('td div a[class^="edit-user-data"]')
    );
    expect(editDataLink.nativeElement.getAttribute('href')).toEqual(
      '/' + fakeUser.id + '/izmena'
    );
  });

  it('Should show change user password link', () => {
    const editPasswordLink = fixture.debugElement.query(
      By.css('td div a[class^="edit-user-password"]')
    );
    expect(editPasswordLink.nativeElement.getAttribute('href')).toEqual(
      '/' + fakeUser.id + '/promena-lozinke'
    );
  });
});

const fakeUser: User = {
  id: 2,
  name: 'Test2',
  email: 'test2@test.com',
  role: 'USER',
};
