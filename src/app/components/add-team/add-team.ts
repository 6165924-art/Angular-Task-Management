import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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
    const message = this.addTeamForm.value.name!;
    if (typeof message == 'string')
      this.teamService.addTeam(message).subscribe({
        next: (res) => {
          this.error.set(null);
        },
        error: (err) => {
          this.error.set('Add Team failed. Please try again later.');
        },
      });
  }

}
