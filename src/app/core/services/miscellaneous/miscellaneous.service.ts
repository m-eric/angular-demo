import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class MiscellaneousService {
  private _sidebarToggled = new BehaviorSubject(false);

  constructor(private localStorageService: LocalStorageService) {
    this._sidebarToggled.next(this.localStorageService.getSidebarToggled());
  }

  getSidebarToggled(): Observable<boolean> {
    return this._sidebarToggled.asObservable();
  }

  toggleSidebar() {
    const toggled = !this._sidebarToggled.getValue();
    this.localStorageService.setSidebarToggled(toggled);
    this._sidebarToggled.next(toggled);
  }
}
