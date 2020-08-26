import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { AuthUser } from 'src/app/core/models/auth/auth-user.model';

@Component({
  selector: 'tr [app-auth-user-row]',
  templateUrl: './auth-user-row.component.html',
  styleUrls: ['./auth-user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthUserRowComponent implements OnInit {
  @Input() authUser: AuthUser;

  constructor() {}

  ngOnInit(): void {}
}
