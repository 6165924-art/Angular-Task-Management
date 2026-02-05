import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
    const user: User = { email: this.loginForm.value.email!, password: this.loginForm.value.password! };
    if (typeof user.email == 'string' && typeof user.password == 'string')


      this.auth.login(user).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['/tasks']);

        },
        error: (err) => {
          if (err.status === 401)
            this.error.set('Login failed: Invalid email or password');
          else
            this.error.set('Login failed. Please try again later.');
        },
      });

  }
}
