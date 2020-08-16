import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './core/guards/auth/auth.guard';
import { SysadminGuard } from './core/guards/sysadmin/sysadmin.guard';
import { GuestGuard } from './core/guards/guest/guest.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthModule } from './modules/auth/auth.module';
import { LogoutActionComponent } from './shared/components/logout-action/logout-action.component';

const appRoutes: Routes = [
  {
    path: 'login',
    canActivate: [GuestGuard],
    loadChildren: () => AuthModule,
  },
  {
    path: 'logout',
    canActivate: [AuthGuard],
    component: LogoutActionComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => DashboardModule,
  },
  {
    path: 'korisnici',
    canActivate: [AuthGuard, SysadminGuard],
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}
