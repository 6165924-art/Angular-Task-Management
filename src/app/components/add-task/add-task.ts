import { Component, inject, signal } from '@angular/core';
import { Tasks } from '../../services/tasks';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/projectModel';
import { Projects } from '../../services/projects';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  taskService = inject(Tasks);
  projectId = signal<number | null>(null)
  private route = inject(ActivatedRoute);
  router = inject(Router)
  projectService = inject(Projects);
  projects = signal<Project[]>([]);

  addTaskForm = new FormGroup({
    projectId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    dueDate: new FormControl('')
  });
  error = signal<string | null>(null);

  navigateToAllTasks() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (id) {
        this.projectId.set(parseInt(id));
      }
    });
    this.loudProjects();

    if (this.projectId()) {
      this.addTaskForm.patchValue({
        projectId: this.projectId()!.toString()
      })
    }
  }

  loudProjects() {
    this.error.set(null);
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects.set(res);
      },
      error: (err) => {
        this.error.set('Failed to load projects');
      },
      complete: () => {
      }
    })
  }

  onSubmit() {
    const { projectId, title, description, status, priority, dueDate } = this.addTaskForm.value;

    if (typeof projectId == 'string' && typeof title == 'string')
      this.taskService.addTask({ projectId: parseInt(projectId), title, description: description || null, status: status || null, priority: priority || null, due_date: dueDate || null }).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['../'], { relativeTo: this.route })

        },
        error: (err) => {
          this.error.set('Add Task failed. Please try again later.');
        },
      });
  }
}
