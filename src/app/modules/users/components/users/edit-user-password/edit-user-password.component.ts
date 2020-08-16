import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { User } from './../../../../../core/models/users/user.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthService } from './../../../../../core/services/auth/auth.service';
import { BTN_SUBMIT_STATUS } from 'src/app/core/models/btn-submit/btn-submit-status.type';

@Component({
  selector: 'app-edit-user-password',
  templateUrl: './edit-user-password.component.html',
  styleUrls: ['./edit-user-password.component.scss'],
})
export class EditUserPasswordComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  submitStatus: BTN_SUBMIT_STATUS = '';
  submitSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
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

    this.userForm = new FormGroup(
      {
        password: new FormControl(null, [Validators.required]),
        confirm: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.matchPasswords.bind(this),
      }
    );
  }

  matchPasswords(formGroup: FormGroup) {
    if (formGroup.get('password').value !== formGroup.get('confirm').value) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  onBackButton() {
    this.location.back();
  }

  onSubmit() {
    this.submitStatus = 'loading';

    this.submitSubscription = this.usersService
      .updateUserPassword(this.user.id, {
        password: this.userForm.value.password,
      })
      .subscribe(
        (res) => {
          this.submitStatus = 'success';
        },
        (err) => {
          this.submitStatus = 'error';
        }
      );
  }

  ngOnDestroy() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
