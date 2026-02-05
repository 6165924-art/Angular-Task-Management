import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tasks } from '../../services/tasks';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/taskModel';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
})
export class UpdateTask {
  taskService = inject(Tasks);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskId = signal<number | null>(null)
  // private task = signal <Task|null>(null)

  updateTaskForm = new FormGroup({
    // projectId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    dueDate: new FormControl('')
  });
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (id) {
        this.taskId.set(parseInt(id));
      }
    });
    // const navigation = this.router.getCurrentNavigation();
    // const t = navigation?.extras.state?.task;
    // this.task.set(t)

    /////////////////////////////////////////////////////////////////////////////////////////////
    const lsTask = localStorage.getItem('task');
    let task: Task;
    if (lsTask) {
      // try {
      task = JSON.parse(lsTask);
      // this.userBehaviorSubject.next(user);
      // }
      //  catch (error) {
      // console.error('Error parsing task from localStorage:', error);
      // }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////


    this.updateTaskForm.patchValue({
      title: task!.title,
      description: task!.description,
      status: task!.status,
      priority: task!.priority,
      dueDate: task!.due_date?.toString()
    })

  }

  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { title, description, status, priority, dueDate } = this.updateTaskForm.value;
    if (typeof title == 'string')
      this.taskService.updateTask({ id: this.taskId()!, title, description: description || null, status: status || null, priority: priority || null, due_date: dueDate || null }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Task successful', res);
          this.router.navigate(['../../'], { relativeTo: this.route })
        },
        error: (err) => {
          this.error.set('Add Task failed. Please try again later.');
        },
      });
    // this.router.navigate(['/tasks']);
  }
}
