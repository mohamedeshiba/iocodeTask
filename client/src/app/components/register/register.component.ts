import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/UserService/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm!: FormGroup;
  showSuccessMessage:boolean = false;


  constructor(private userService:UserService,private router: Router) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

async onSubmit() {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      user.isAdmin = true;
      this.userService.createUser(user).subscribe({
        next:(response) =>{ 
          console.log('User created successfully', response);
          this.showSuccessMessage = true;
          (async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.showSuccessMessage = false;
            this.router.navigate(['/login']);
            })();
            },
       error: (error) => {
          if (error.status === 400) {
            alert('User already exists in the database');
          } else {
            console.error('Failed to create user', error);
          }
        }
       
    });
    }
  }

}
