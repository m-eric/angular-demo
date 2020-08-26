import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  errorMessage = null;
  isLoading = false;
  loginForm: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef;
  @ViewChild('inputPassword') inputPassword: ElementRef;
  @ViewChild('buttonSubmit') buttonSubmit: ElementRef;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(null),
    });

    setTimeout(() => {
      this.inputEmail.nativeElement.focus();
    }, 200);
  }

  onEnterEmail(event) {
    if (event.code == 'Enter') {
      this.inputPassword.nativeElement.focus();
    }
  }

  toggleRemember() {
    const oldValue = this.loginForm.controls.remember.value;
    this.loginForm.controls.remember.setValue(!oldValue);
  }

  onSubmit() {
    this.errorMessage = null;
    this.isLoading = true;
    this.buttonSubmit.nativeElement.disabled = true;

    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    const remember: boolean = this.loginForm.value.remember;

    this._authService.login(email, password, remember).subscribe(
      (res) => {
        this.isLoading = false;
        this.buttonSubmit.nativeElement.disabled = false;
        this.router.navigate(['/']);
        this.cdr.detectChanges();
      },
      (err) => {
        this.isLoading = false;
        this.errorMessage = err;
        this.buttonSubmit.nativeElement.disabled = false;
        this.cdr.detectChanges();
      }
    );
  }
}
