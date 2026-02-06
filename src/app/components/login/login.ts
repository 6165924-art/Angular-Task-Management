import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  auth = inject(Auth);
  private toastr = inject(ToastrService);
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  hidePassword = signal<boolean>(true);

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const user: User = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.isLoading.set(true);
    this.error.set(null);

    this.auth.login(user).subscribe({
      next: (res) => {
        this.error.set(null);
        this.toastr.success('התחברת בהצלחה!', 'ברוכה הבאה');
        this.router.navigate(['/teams']);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMessage = err.status === 401
          ? 'האימייל או הסיסמה שגויים'
          : 'אירעה שגיאה בהתחברות. אנא נסי שוב מאוחר יותר.';
        this.error.set(errorMessage);
        this.toastr.error(errorMessage, 'שגיאה בהתחברות');
      },
    });
  }
}
