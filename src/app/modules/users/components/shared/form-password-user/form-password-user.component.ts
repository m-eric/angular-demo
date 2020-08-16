import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-password-user',
  templateUrl: './form-password-user.component.html',
  styleUrls: ['./form-password-user.component.scss'],
})
export class FormPasswordUserComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() class: string;
  randomPassword: string = '';

  constructor() {}

  ngOnInit(): void {}

  onGenerateRandomPassword() {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 12; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    this.randomPassword = result;
    this.formGroup.get('password').patchValue(result);
    this.formGroup.get('confirm').patchValue(result);
  }

  onManualInput() {
    if (!this.randomPassword) {
      return;
    }
    this.formGroup.get('password').patchValue('');
    this.formGroup.get('confirm').patchValue('');
    this.randomPassword = '';
  }
}
