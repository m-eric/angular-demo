import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [DashboardComponent, ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule { }
