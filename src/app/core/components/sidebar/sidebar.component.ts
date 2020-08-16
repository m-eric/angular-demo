import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from './../../../../environments/environment';
import { MiscellaneousService } from './../../services/miscellaneous/miscellaneous.service';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isToggled: boolean;
  role = "";
  brandTitle = "";
  brandLink = "";
  sidebarToggledSubscription: Subscription;
  authUserSubscription: Subscription;

  constructor(private miscellaneousService: MiscellaneousService, private authService:AuthService) {}

  ngOnInit(): void {
    this.sidebarToggledSubscription = this.miscellaneousService.getSidebarToggled().subscribe((toggled) => {
      this.isToggled = toggled;
    });
    this.role = this.authService.user.getValue().role;
    this.brandTitle = environment.brandTitle;
    this.brandLink = environment.brandLink;
  }

  onToggleSidebar() {
    this.miscellaneousService.toggleSidebar();
  }

  onActivateLink() {
    if (document.body.clientWidth < 768) {
      this.miscellaneousService.toggleSidebar();
    }
  }

  ngOnDestroy() {
    this.sidebarToggledSubscription.unsubscribe();
  }
}
