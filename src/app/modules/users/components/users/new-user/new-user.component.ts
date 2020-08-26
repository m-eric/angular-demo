import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { BTN_SUBMIT_STATUS } from './../../../../../core/models/btn-submit/btn-submit-status.type';
import { USER_ROLES } from './../../../../../core/models/users/user-roles.model';
import { UsersService } from './../../../../../core/services/users/users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  submitStatus: BTN_SUBMIT_STATUS = '';
  submitSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        userData: new FormGroup({
          name: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [Validators.required, Validators.email]),
          role: new FormControl(USER_ROLES.user, [Validators.required]),
        }),
        userPassword: new FormGroup({
          password: new FormControl(null, [Validators.required]),
          confirm: new FormControl(null, [Validators.required]),
        }),
      },
      {
        validators: this.matchPasswords.bind(this),
      }
    );
  }

  matchPasswords(formGroup: FormGroup) {
    if (
      formGroup.get('userPassword.password').value !==
      formGroup.get('userPassword.confirm').value
    ) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    this.submitStatus = 'loading';

    this.submitSubscription = this.usersService
      .postNewUser({
        name: this.userForm.value.userData.name,
        email: this.userForm.value.userData.email,
        role: this.userForm.value.userData.role,
        password: this.userForm.value.userPassword.password,
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

    this.userForm.reset({ userData: { role: USER_ROLES.user } });
  }

  onBackButton() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
