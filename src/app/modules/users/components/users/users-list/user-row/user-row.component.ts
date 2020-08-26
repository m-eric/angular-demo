import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { User } from 'src/app/core/models/users/user.model';

@Component({
  selector: 'tr [app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRowComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {}
}
