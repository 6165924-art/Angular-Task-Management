import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/userModel';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  auth = inject(Auth);
  private router = inject(Router);
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  error = signal<string | null>(null);
  onSubmit() {
    const user: User = { name: this.registerForm.value.username!, email: this.registerForm.value.email!, password: this.registerForm.value.password! };
    if (typeof user.name == 'string' && typeof user.email == 'string' && typeof user.password == 'string')


      this.auth.register(user).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          if (err.error === 409)
            this.error.set('User with this email already exists');
          else
            this.error.set('Registration failed. Please try again later.');
        },
      });
  }
}
