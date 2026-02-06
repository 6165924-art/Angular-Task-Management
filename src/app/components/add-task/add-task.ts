import { Component, inject, signal } from '@angular/core';
import { Tasks } from '../../services/tasks';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../models/projectModel';
import { Projects } from '../../services/projects';
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
  selector: 'app-add-task',
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
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  taskService = inject(Tasks);
  projectService = inject(Projects);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  projectId = signal<number | null>(null);
  projects = signal<Project[]>([]);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  addTaskForm = new FormGroup({
    projectId: new FormControl('', [Validators.required]),
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
      const id = params.get('projectId');
      if (id) {
        this.projectId.set(parseInt(id));
      }
    });
    this.loadProjects();

    if (this.projectId()) {
      this.addTaskForm.patchValue({
        projectId: this.projectId()!.toString()
      });
    }
  }

  loadProjects() {
    this.error.set(null);
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects.set(res);
      },
      error: (err) => {
        this.error.set('שגיאה בטעינת הפרויקטים');
        this.toastr.error('שגיאה בטעינת הפרויקטים', 'שגיאה');
      }
    });
  }

  navigateToAllTasks() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.addTaskForm.valid) return;

    const { projectId, title, description, status, priority, dueDate } = this.addTaskForm.value;

    if (typeof projectId === 'string' && typeof title === 'string') {
      this.isLoading.set(true);
      this.error.set(null);

      this.taskService.addTask({
        projectId: parseInt(projectId),
        title,
        description: description || null,
        status: status || null,
        priority: priority || null,
        due_date: dueDate || null
      }).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('המשימה נוספה בהצלחה!', 'הוספה מוצלחת');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בהוספת המשימה');
          this.toastr.error('שגיאה בהוספת המשימה', 'שגיאה');
        }
      });
    }
  }
}
