import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/userModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  auth = inject(Auth);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    if (!this.registerForm.valid) return;

    const user: User = {
      name: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.isLoading.set(true);
    this.error.set(null);

    this.auth.register(user).subscribe({
      next: (res) => {
        this.error.set(null);
        this.toastr.success('נרשמת בהצלחה!', 'ברוכה הבאה');
        this.router.navigate(['/teams']);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        const errorMessage = err.status === 409
          ? 'כתובת אימייל זו כבר קיימת'
          : 'אירעה שגיאה בהרשמה. אנא נסי שוב מאוחר יותר.';
        this.error.set(errorMessage);
        this.toastr.error(errorMessage, 'שגיאה בהרשמה');
      },
    });
  }
}
