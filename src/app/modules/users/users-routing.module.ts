import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { EditUserDataComponent } from './components/users/edit-user-data/edit-user-data.component';
import { EditUserPasswordComponent } from './components/users/edit-user-password/edit-user-password.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UsersListComponent,
      },
      {
        path: 'unos',
        component: NewUserComponent,
      },
      {
        path: ':id/izmena',
        component: EditUserDataComponent,
      },
      {
        path: ':id/promena-lozinke',
        component: EditUserPasswordComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
