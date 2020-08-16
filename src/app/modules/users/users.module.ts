import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { FormPasswordUserComponent } from './components/shared/form-password-user/form-password-user.component';
import { FormUserComponent } from './components/shared/form-user/form-user.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { EditUserDataComponent } from './components/users/edit-user-data/edit-user-data.component';
import { EditUserPasswordComponent } from './components/users/edit-user-password/edit-user-password.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    FormPasswordUserComponent,
    FormUserComponent,
    NewUserComponent,
    EditUserDataComponent,
    EditUserPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule,
  ],
})
export class UsersModule {}
