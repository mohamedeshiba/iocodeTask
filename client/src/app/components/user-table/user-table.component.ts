import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        console.log(users);
        this.users = users;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  editUser(user: User) {
    // handle edit user logic
  }

  deleteUser(userId: number) {
    // handle delete user logic
  }
}
