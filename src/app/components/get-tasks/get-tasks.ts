import { Component, inject, OnInit, signal } from '@angular/core';
import { Tasks } from '../../services/tasks';
import { Task } from '../../models/taskModel';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComments } from '../get-comments/get-comments';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    GetComments
  ],
  templateUrl: './get-tasks.html',
  styleUrl: './get-tasks.css',
})
export class GetTasks implements OnInit {
  taskService = inject(Tasks);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  tasks = signal<Task[]>([]);
  todoTasks = signal<Task[]>([]);
  inProgressTasks = signal<Task[]>([]);
  doneTasks = signal<Task[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);
  projectId = signal<number | null>(null);

  getPriorityLabel(priority: string | number): string {
    const p = String(priority).toLowerCase();
    switch (p) {
      case 'high':
      case '1':
        return 'דחוף';
      case 'medium':
      case '2':
        return 'בטיפול';
      case 'low':
      case '3':
        return 'בנחת';
      default:
        return 'רגיל';
    }
  }

  isOverdue(dueDate: string | Date): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  openDeleteDialog(taskId: number, taskTitle: string): void {
    const confirmed = confirm(`האם את בטוחה שברצונך למחוק את המשימה: "${taskTitle}"?`);
    if (confirmed) {
      this.deleteTask(taskId);
    }
  }

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
        this.toastr.success('המשימה נמחקה בהצלחה!', 'מחיקה מוצלחת');
        this.loadTasks();
      },
      error: (err) => {
        this.error.set('שגיאה בהסרת המשימה');
        this.toastr.error('שגיאה בהסרת המשימה', 'שגיאה');
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
    this.loadTasks();
  }

  loadTasks() {
    this.isLouding.set(true);
    this.error.set(null);
    this.taskService.getTasks(this.projectId()).subscribe({
      next: (res) => {
        this.tasks.set(res);
        const todoTasks = this.tasks().filter(task => task.status == 'todo');
        this.todoTasks.set(todoTasks);
        const inProgressTasks = this.tasks().filter(task => task.status == 'in_progress' || task.status == 'in progress');
        this.inProgressTasks.set(inProgressTasks);
        const doneTasks = this.tasks().filter(task => task.status == 'done');
        this.doneTasks.set(doneTasks);
        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('שגיאה בטעינת המשימות');
        this.toastr.error('שגיאה בטעינת המשימות', 'שגיאה');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    });
  }

  retry() {
    this.loadTasks();
  }
}
