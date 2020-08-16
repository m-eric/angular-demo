import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError, take, exhaustMap } from 'rxjs/operators';

import { User } from './../../models/users/user.model';
import { USER_ROLES_SORTING_PRIORITIES } from './../../models/users/user-roles.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from './../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users = new BehaviorSubject<User[]>(null);

  constructor(
    private http: HttpClient,
    private loadingBarService: LoadingBarService,
    private authService: AuthService
  ) {}

  getUsers(loadingBar = false) {
    if (loadingBar) {
      this.loadingBarService.start();
    }
    this.http
      .get('/users')
      .pipe(
        tap((fetchedUsers: [{ [key: string]: any }]) => {
          this.saveFetchedUsers(fetchedUsers);
        })
      )
      .subscribe(
        (users) => {},
        (err) => {},
        () => {
          if (loadingBar) {
            this.loadingBarService.complete();
          }
        }
      );
  }

  postNewUser(newUser) {
    return this.http.post('/users', newUser).pipe(
      take(1),
      exhaustMap((_) =>
        this.http.get('/users').pipe(
          tap((fetchedUsers: [{ [key: string]: any }]) => {
            this.saveFetchedUsers(fetchedUsers);
          })
        )
      )
    );
  }

  updateUserData(id, userData) {
    return this.http.patch('/users/' + id, userData).pipe(
      take(1),
      exhaustMap((_) =>
        this.http.get('/users').pipe(
          tap((fetchedUsers: [{ [key: string]: any }]) => {
            this.saveFetchedUsers(fetchedUsers);
          })
        )
      )
    );
  }

  updateUserPassword(id, userData) {
    return this.http.patch('/users/' + id, userData).pipe(
      take(1),
      exhaustMap((_) =>
        this.http.get('/users').pipe(
          tap((fetchedUsers: [{ [key: string]: any }]) => {
            this.saveFetchedUsers(fetchedUsers);
          })
        )
      )
    );
  }

  saveFetchedUsers(fetchedUsers: [{ [key: string]: any }]) {
    let users: User[] = [];
    fetchedUsers.map((item) => {
      users.push(new User(item.id, item.name, item.email, item.role));
    });

    const rolesPriorities = USER_ROLES_SORTING_PRIORITIES;
    const authUser = this.authService.user.getValue();
    users = users.filter((item) => item.id !== authUser.id);
    users.sort((a: User, b: User) => {
      if (rolesPriorities[a.role] > rolesPriorities[b.role]) {
        return 1;
      }
      if (rolesPriorities[a.role] < rolesPriorities[b.role]) {
        return -1;
      }
      return 0;
    });
    users.unshift(<User>authUser);

    this.users.next(users);
  }

  getUserByID(id: number): User {
    const users = this.users.getValue();
    if (!users || !users.length) {
      return null;
    }
    const index = users.findIndex((item) => item.id === id);
    return users[index];
  }
}
