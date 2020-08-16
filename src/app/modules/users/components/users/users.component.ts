import { Component, OnInit } from '@angular/core';

import { UsersService } from './../../../../core/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers();
  }

}
