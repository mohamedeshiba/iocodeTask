import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/UserService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
/**
 * Submits the login form if it is valid and logs in the user.
 * If the login is successful, the user's token is stored in local storage.
 * If there is an error, it is logged to the console.
 * Upon completion, the user is navigated to the home page.
 */
onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.userService.loginUser(email, password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        alert("to the home page");
        this.router.navigate(['/']);
      },
    });
  }
} 




}
