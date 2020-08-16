import { Component } from '@angular/core';

import { AuthService } from './../../../core/services/auth/auth.service';

@Component({
  selector: 'app-logout-action',
  template: '',
})
export class LogoutActionComponent {
  constructor(private authService: AuthService) {
    this.authService.logout();
  }
}
