import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map, take } from 'rxjs/operators';

import { AuthUser } from '../../models/auth/auth-user.model';
import { AuthStorage } from '../../models/auth/auth-storage.interface';
import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser>(null);
  token: string;
  tokenExpireDate: number;
  remembered = false;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  login(email: string, password: string, remember: boolean) {
    const postData = { email, password, remember };
    return this.http.post('/auth/login', postData).pipe(
      tap((res: any) => {
        const user = new AuthUser(
          res.user.id,
          res.user.name,
          res.user.email,
          res.user.role
        );
        const token = res.access_token;
        const remembered = res.remember;
        const tokenExpireDate = new Date().getTime() + +res.expires_in * 1000;

        if (!!res.remember) {
          this.remembered = true;
          const storageData: AuthStorage = {
            user,
            token,
            tokenExpireDate,
            remembered,
          };
          this.localStorageService.saveAuth(storageData);
        } else {
          this.localStorageService.removeAuth();
        }

        this.autoLogoutTimer(tokenExpireDate);

        this.token = token;
        this.tokenExpireDate = tokenExpireDate;
        this.user.next(user);
      }),
      map(() => 'SUCCESS'),
      catchError(() => throwError('Погрешан email или лозинка'))
    );
  }

  autoLogin() {
    const storage: AuthStorage = this.localStorageService.getAuth();

    if (!storage) {
      return;
    }

    this.token = storage.token;
    this.tokenExpireDate = storage.tokenExpireDate;
    this.remembered = storage.remembered;
    this.user.next(storage.user);

    this.autoLogoutTimer(storage.tokenExpireDate);
  }

  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }

    if (this.token) {
      this.http.post('/auth/logout', null).pipe(take(1)).subscribe();
    }

    this.localStorageService.removeAuth();
    this.token = null;
    this.remembered = null;
    this.tokenExpireDate = null;
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  autoLogoutTimer(expirationTime: number) {
    const currentTimeDiff = expirationTime - new Date().getTime();

    if (currentTimeDiff <= 0) {
      this.logout();
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, currentTimeDiff);
  }

  changeAuthUserPassword(password: string) {
    return this.http.post('/auth/change-password', {
      password,
    });
  }
}
