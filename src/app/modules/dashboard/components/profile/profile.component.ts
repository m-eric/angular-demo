import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BTN_SUBMIT_STATUS } from './../../../../core/models/btn-submit/btn-submit-status.type';
import { AuthUser } from '../../../../core/models/auth/auth-user.model';
import { AuthService } from './../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild('inputConfirm') inputConfirm: ElementRef;
  passwordChangeForm: FormGroup;
  authUser: AuthUser;
  submitStatus: BTN_SUBMIT_STATUS = '';
  submitSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authUser = this.authService.user.getValue();
    this.passwordChangeForm = new FormGroup(
      {
        password: new FormControl(null, [Validators.required]),
        confirm: new FormControl(null, []),
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

  onPasswordEnter() {
    this.inputConfirm.nativeElement.focus();
  }

  onSubmit() {
    if (!this.passwordChangeForm.valid) {
      return;
    }

    this.submitStatus = 'loading';
    this.passwordChangeForm.disable();
    this.submitSubscription = this.authService
      .changeAuthUserPassword(this.passwordChangeForm.value.password)
      .subscribe(
        (res) => {
          this.submitStatus = 'success';
          this.inputPassword.nativeElement.blur();
          this.inputConfirm.nativeElement.blur();
          this.passwordChangeForm.reset();
        },
        (err) => {
          this.submitStatus = 'error';
        },
        () => {
          this.passwordChangeForm.enable();
        }
      );
  }

  ngOnDestroy() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }
}
