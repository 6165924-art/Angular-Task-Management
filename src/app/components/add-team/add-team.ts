import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { AddMember } from '../add-member/add-member';

@Component({
  selector: 'app-add-team',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  teamService = inject(Teams);
  addTeamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    const message = this.addTeamForm.value.name!;
    // const {username,email,password}=this.registerForm.value;
    if (typeof message == 'string')
      this.teamService.addTeam(message).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Login successful', res);
        },
        error: (err) => {
            this.error.set('Add Team failed. Please try again later.');
        },
      });
  }

}
