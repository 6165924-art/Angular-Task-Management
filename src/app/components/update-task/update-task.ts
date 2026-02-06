import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tasks } from '../../services/tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/taskModel';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
  taskService = inject(Tasks);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  private taskId = signal<number | null>(null);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  updateTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    status: new FormControl('todo'),
    priority: new FormControl('normal'),
    dueDate: new FormControl('')
  });

  statusOptions = [
    { value: 'todo', label: 'למבצע' },
    { value: 'in_progress', label: 'בטיפול' },
    { value: 'done', label: 'הושלם' }
  ];

  priorityOptions = [
    { value: 'low', label: 'בנחת' },
    { value: 'normal', label: 'רגיל' },
    { value: 'high', label: 'דחוף' }
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (id) {
        this.taskId.set(parseInt(id));
      }
    });

    const lsTask = localStorage.getItem('task');
    if (lsTask) {
      const task: Task = JSON.parse(lsTask);
      this.updateTaskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date?.toString()
      });
    }
  }

  onSubmit() {
    if (!this.updateTaskForm.valid) return;

    const { title, description, status, priority, dueDate } = this.updateTaskForm.value;

    if (typeof title === 'string') {
      this.isLoading.set(true);
      this.error.set(null);

      this.taskService.updateTask({
        id: this.taskId()!,
        title,
        description: description || null,
        status: status || null,
        priority: priority || null,
        due_date: dueDate || null
      }).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('המשימה עודכנה בהצלחה!', 'עדכון מוצלח');
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בעדכון המשימה');
          this.toastr.error('שגיאה בעדכון המשימה', 'שגיאה');
        }
      });
    }
  }

  navigateToAllTasks() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
