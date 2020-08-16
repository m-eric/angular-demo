import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AutologoutOnUnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Automatically logout user if at any moment he gets Error 401 - Unauthorized
          // Can happen if Sysadmin changes user's role on the backend while the user is still logged in
          this.authService.logout();
        }
        return next.handle(request);
      })
    );
  }
}
