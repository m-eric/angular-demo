import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AuthInterceptor } from './interceptors/auth-interceptor/auth.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url-intterceptor/base-url.interceptor';
import { AutologoutOnUnauthorizedInterceptor } from './interceptors/autologout-on-unauthorized/autologout-on-unauthorized.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule, LoadingBarModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutologoutOnUnauthorizedInterceptor,
      multi: true,
    },
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoadingBarModule
  ],
})
export class CoreModule {}
