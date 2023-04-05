import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit{
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
@Input() user!:User;
constructor() {}

}
