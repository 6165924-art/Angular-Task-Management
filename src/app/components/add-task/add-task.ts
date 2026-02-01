import { Component, inject, signal } from '@angular/core';
import { Tasks } from '../../services/tasks';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
taskService = inject(Tasks);
  addTaskForm = new FormGroup({
    projectId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { projectId, title, description } = this.addTaskForm.value;
    if (typeof projectId == 'string' && typeof title == 'string')
      this.taskService.addTask({ projectId: (parseInt(projectId)), title, description: description || null }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Task successful', res);
        },
        error: (err) => {
          this.error.set('Add Task failed. Please try again later.');
        },
      });
  }
}
