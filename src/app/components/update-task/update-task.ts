import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tasks } from '../../services/tasks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
taskService = inject(Tasks);
private router = inject(Router);
  updateTaskForm = new FormGroup({
    // projectId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const {  title, description } = this.updateTaskForm.value;
    if (typeof title == 'string')
      this.taskService.updateTask({ id: (parseInt('5')), title, description: description || null }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Task successful', res);
        },
        error: (err) => {
          this.error.set('Add Task failed. Please try again later.');
        },
      });
      this.router.navigate(['/task']);
  }
}
