import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { UserRolePipe } from './pipes/user-role/user-role.pipe';
import { UserRoleColorPipe } from './pipes/user-role-color/user-role-color.pipe';
import { BtnSubmitStatusComponent } from './components/btn-submit-status/btn-submit-status.component';
import { LogoutActionComponent } from './components/logout-action/logout-action.component';

@NgModule({
  declarations: [
    UserRolePipe,
    UserRoleColorPipe,
    BtnSubmitStatusComponent,
    LogoutActionComponent,
  ],
  imports: [CommonModule, NgxTrimDirectiveModule],
  exports: [
    NgxTrimDirectiveModule,
    UserRolePipe,
    UserRoleColorPipe,
    BtnSubmitStatusComponent,
    LogoutActionComponent,
  ],
})
export class SharedModule {}
