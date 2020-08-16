import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from './../../services/auth/auth.service';
import { MiscellaneousService } from './../../services/miscellaneous/miscellaneous.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  logoutText = 'Logout';

  constructor(
    private miscellaneousService: MiscellaneousService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.remembered) {
      this.logoutText = 'Logout!';
    }
  }

  onToggleSidebar() {
    this.miscellaneousService.toggleSidebar();
  }
}
