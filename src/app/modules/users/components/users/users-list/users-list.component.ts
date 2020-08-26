import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from './../../../../../core/models/users/user.model';
import { AuthUser } from './../../../../../core/models/auth/auth-user.model';
import { UsersService } from './../../../../../core/services/users/users.service';
import { AuthService } from './../../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  usersSubscription: Subscription;
  authUser: AuthUser;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.users.subscribe(
      (users: User[]) => {
        this.users = users;
        this.cdr.markForCheck();
      }
    );
    this.authUser = this.authService.user.getValue();
  }

  onRefresh() {
    this.usersService.getUsers(true);
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
