import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/userModel';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  // imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,CommonModule],
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
    console.log('in onsubmit');
    const user: User = { name: this.registerForm.value.username!, email: this.registerForm.value.email!, password: this.registerForm.value.password! };
    // const {username,email,password}=this.registerForm.value;
    if (typeof user.name == 'string' && typeof user.email == 'string' && typeof user.password == 'string')


      this.auth.register(user).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Registration successful', res);
          this.router.navigate(['/team']);
        },
        error: (err) => {
          if (err.error === 409)
            this.error.set('User with this email already exists');
          else
            this.error.set('Registration failed. Please try again later.');
        },
      });
    // this.router.navigate(['/team']);
  }
}


//======================================================================================

// import { Component, signal } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Auth } from '../../services/auth';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './register.html',
//   styleUrls: ['./register.css'],
// })
// export class Register {
//   authService = new Auth();
//   registerForm = new FormGroup({
//     username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//   })
//   errorMass = signal<string | null>(null);
//   onSubmit() {
//     const formData = this.registerForm.value;
//     if (typeof formData.username == 'string' && typeof formData.email == 'string' && typeof formData.password == 'string') {
//       this.authService.register({ name: formData.username, email: formData.email, password: formData.password }).subscribe({
//         next: (res) => {
//           console.log('Registration successful:', res);
//         },
//         error: (err) => {
//           console.error('Registration failed:', err);
//           this.errorMass.set(err.message);
//         }
//       });
//     }
//   }
// }

