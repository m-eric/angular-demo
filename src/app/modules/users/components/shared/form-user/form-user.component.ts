import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { USER_ROLES } from './../../../../../core/models/users/user-roles.model';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUserComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() class: string;
  userRoles: string[];

  constructor() {
    // make userRoles string array
    let roles: string[] = [];
    Object.keys(USER_ROLES).map((key) => {
      roles.push(USER_ROLES[key]);
    });
    this.userRoles = roles;
  }

  ngOnInit(): void {}

  onSubmit() {}
}
