import { Component, inject, OnInit, signal } from '@angular/core';
import { Tasks } from '../../services/tasks';
import { Task } from '../../models/taskModel';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComments } from '../get-comments/get-comments';

@Component({
  selector: 'app-get-tasks',
  standalone: true,
  imports: [GetComments],
  templateUrl: './get-tasks.html',
  styleUrl: './get-tasks.css',
})
export class GetTasks implements OnInit {
  taskService = inject(Tasks);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  tasks = signal<Task[]>([]);
  todoTasks = signal<Task[]>([]);
  inProgressTasks = signal<Task[]>([]);
  doneTasks = signal<Task[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);
  projectId = signal<number | null>(null);

  navigateToAddTask() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  navigateToAllProjectsInTheTeam() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
  navigateToUpdateTask(taskId: number, task: Task) {
    localStorage.setItem('task', JSON.stringify(task));
    this.router.navigate([`${taskId}/update`], { relativeTo: this.route });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: (res) => {
        this.loudTasks();
      },
      error: (err) => {
        this.error.set('Failed to delete task');
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (id) {
        this.projectId.set(parseInt(id));
      }
    });
    this.loudTasks();

  }
  loudTasks() {
    this.isLouding.set(true);
    this.error.set(null);
    this.taskService.getTasks(this.projectId()).subscribe({
      next: (res) => {

        this.tasks.set(res);
        const todoTasks = this.tasks().filter(
          task => task.status == 'todo'
        );
        this.todoTasks.set(todoTasks)
        const inProgressTasks = this.tasks().filter(
          task => task.status == 'in progress'
        );
        this.inProgressTasks.set(inProgressTasks)
        const doneTasks = this.tasks().filter(
          task => task.status == 'done'
        );
        this.doneTasks.set(doneTasks)

        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tasks');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    })
  }

  retry() {
    this.loudTasks();
  }
}
