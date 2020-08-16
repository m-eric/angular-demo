import { Pipe, PipeTransform } from '@angular/core';

import { USER_ROLES } from './../../../core/models/users/user-roles.model';

@Pipe({
  name: 'userRoleColor',
})
export class UserRoleColorPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case USER_ROLES.disabled:
        return 'text-red-300 italic';
      case USER_ROLES.user:
        return 'text-green-700';
      case USER_ROLES.admin:
        return 'text-purple-700';
      case USER_ROLES.sysadmin:
        return 'text-orange-600';
      default:
        return null;
    }
  }
}
