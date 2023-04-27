import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService,private dialog: MatDialog) { }

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

  updateUser(user: User) {
    // const dialogRef = this.dialog.open(UpdateUserComponent, {
    //   data: { user: user}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  deleteUser(user:User) {
    // handle delete user logic
  }
}
