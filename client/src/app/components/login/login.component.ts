import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/UserService/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    // First, check if the form is valid
if (this.loginForm.valid) {
// If the form is valid, extract the email and password values from the form
  const email = this.loginForm.get('email')?.value;
  const password = this.loginForm.get('password')?.value;
  this.userService.loginUser(email, password).subscribe( (response) => {
    console.log(response);
    if(response.auth){
      // Use the router to navigate to the home page with link /home
      alert(response.message);
    }
    else{
      // Display alert message with the response message
      alert(response.message);
    }
  }, (error) => {
    console.log(error);
  });

}
}

}
