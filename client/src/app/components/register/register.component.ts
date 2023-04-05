import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/UserService/user.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm!: FormGroup;

  constructor(private userService:UserService) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      user.isAdmin = true;
      this.userService.createUser(user).subscribe(
        (response) =>{ console.log('User created successfully', response)
        
      },
        (error) => console.error('Failed to create user', error)
      );
    }
  }
}
