import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  private router = inject(Router);
  auth = inject(Auth);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    const user: User = { email: this.loginForm.value.email!, password: this.loginForm.value.password! };
    // const {username,email,password}=this.registerForm.value;
    if (typeof user.email == 'string' && typeof user.password == 'string')


      this.auth.login(user).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Login successful', res);
              this.router.navigate(['/team']);

        },
        error: (err) => {
          if (err.status === 401)
            this.error.set('Login failed: Invalid email or password');
          else
            this.error.set('Login failed. Please try again later.');
        },
      });
    // this.router.navigate(['/team']);

  }
}
