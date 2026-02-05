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
    // teamId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
  });
  error = signal<string | null>(null);

navigateToAllProject(){
      this.router.navigate(['../'], { relativeTo: this.route });
}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log('ניתוב: ', this.route);

      const id = params.get('teamId');
      if (id) {
        this.teamId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { name, description } = this.addProjectForm.value;
    if (typeof name == 'string')
      this.projectService.addProject({ teamId: this.teamId()!, name, description: description || null }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Project successful', res);
          this.router.navigate(['../'], { relativeTo: this.route })
        },
        error: (err) => {
          this.error.set('Add Project failed. Please try again later.');
        },
      });
  }
}
