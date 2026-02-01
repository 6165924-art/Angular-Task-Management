import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../services/projects';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  projectService = inject(Projects);
  addProjectForm = new FormGroup({
    teamId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { teamId, name, description } = this.addProjectForm.value;
    if (typeof teamId == 'string' && typeof name == 'string')
      this.projectService.addProject({ teamId: (parseInt(teamId)), name, description: description || null }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Project successful', res);
        },
        error: (err) => {
          this.error.set('Add Project failed. Please try again later.');
        },
      });
  }
}
