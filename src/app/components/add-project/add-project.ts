import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../services/projects';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  projectService = inject(Projects);
  teamId = signal<number | null>(null)
  private route = inject(ActivatedRoute);
  router = inject(Router)

  addProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
  });
  error = signal<string | null>(null);

  navigateToAllProject() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {

      const id = params.get('teamId');
      if (id) {
        this.teamId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    const { name, description } = this.addProjectForm.value;
    if (typeof name == 'string')
      this.projectService.addProject({ teamId: this.teamId()!, name, description: description || null }).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['../'], { relativeTo: this.route })
        },
        error: (err) => {
          this.error.set('Add Project failed. Please try again later.');
        },
      });
  }
}
