import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersComponent } from './users.component';
import { UsersService } from './../../../../core/services/users/users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let usersServiceMock: any;

  beforeEach(async(() => {
    usersServiceMock = jasmine.createSpyObj('UsersService', ['getUsers']);
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get users from service on init', () => {
    component.ngOnInit();
    expect(usersServiceMock.getUsers).toHaveBeenCalled();
  });
});
