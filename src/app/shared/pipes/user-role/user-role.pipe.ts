import { Pipe, PipeTransform } from '@angular/core';

import { USER_ROLES } from './../../../core/models/users/user-roles.model';

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case USER_ROLES.disabled:
        return 'Неактиван';
      case USER_ROLES.user:
        return 'Корисник';
      case USER_ROLES.admin:
        return 'Администратор';
      case USER_ROLES.sysadmin:
        return 'Систем администратор';
      default:
        return value;
    }
  }
}
