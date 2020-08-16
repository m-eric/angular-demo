import { Injectable } from '@angular/core';

import { AuthStorage } from '../../models/auth/auth-storage.interface';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  /**
   * Sidebar toggled status
   */
  getSidebarToggled(): boolean {
    return !!localStorage.getItem('SBTG');
  }
  setSidebarToggled(val: boolean) {
    if (val) localStorage.setItem('SBTG', 'T');
    else localStorage.removeItem('SBTG');
  }

  /**
   * Auth data
   */
  saveAuth(authData: AuthStorage) {
    localStorage.setItem('AU', this.utf8_to_b64(JSON.stringify(authData)));
  }
  getAuth(): AuthStorage {
    const auth = localStorage.getItem('AU');
    if (!auth) return null;
    return JSON.parse(this.b64_to_utf8(auth));
  }
  removeAuth() {
    localStorage.removeItem('AU');
  }

  /**
   * Utility: basic encode/decode (works with cyrillic)
   */
  utf8_to_b64(str: string): string {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  b64_to_utf8(str: string): string {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
