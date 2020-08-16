import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { environment } from './../environments/environment';
import { AuthService } from './core/services/auth/auth.service';
import { AuthUser } from './core/models/auth/auth-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  authUser: AuthUser;
  authUserSubscription: Subscription;

  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(environment.appTitle);
    this.authService.autoLogin();
    this.authUserSubscription = this.authService.user.subscribe((user) => {
      this.authUser = user;
    });
  }

  ngOnDestroy() {
    this.authUserSubscription.unsubscribe();
  }
}
