import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from './../../../../../core/models/users/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthService } from './../../../../../core/services/auth/auth.service';
import { BTN_SUBMIT_STATUS } from 'src/app/core/models/btn-submit/btn-submit-status.type';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserDataComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  submitStatus: BTN_SUBMIT_STATUS = '';
  submitSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initUser();
    this.initUserForm();
  }

  initUser() {
    const user = this.usersService.getUserByID(
      +this.route.snapshot.params['id']
    );
    if (!user) {
      this.router.navigate(['/korisnici']);
      return;
    }
    if (user.id === this.authService.user.getValue().id) {
      this.router.navigate(['/profil']);
      return;
    }
    this.user = user;
  }

  initUserForm() {
    const name = !!this.user ? this.user.name : null;
    const email = !!this.user ? this.user.email : null;
    const role = !!this.user ? this.user.role : null;

    this.userForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      role: new FormControl(role, [Validators.required]),
    });
  }

  onBackButton() {
    this.location.back();
  }

  onSubmit() {
    this.submitStatus = 'loading';

    this.submitSubscription = this.usersService
      .updateUserData(this.user.id, {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        role: this.userForm.value.role,
      })
      .subscribe(
        (res) => {
          this.submitStatus = 'success';
          this.cdr.detectChanges();
        },
        (err) => {
          this.submitStatus = 'error';
          this.cdr.detectChanges();
        }
      );
  }

  ngOnDestroy() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
