import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  teamService = inject(Teams);
  teamId = input.required<number>();

  addMemberForm = new FormGroup({
    userID: new FormControl('', [Validators.required])
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    const userId = this.addMemberForm.value.userID!;
    // const {username,email,password}=this.registerForm.value;
    const user_id=Number(userId);
    if (typeof this.teamId() == 'number')
      this.teamService.addMember(this.teamId(), user_id).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Login successful', res);
        },
        error: (err) => {
            this.error.set('Add member failed. Please try again later.');
        },
      });
  }

}
