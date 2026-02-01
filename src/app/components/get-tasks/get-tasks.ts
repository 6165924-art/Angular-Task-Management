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
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);
  projectId=signal<number | null>(null);

  navigateToAddTask(){
    this.router.navigate(['/task/new']);
  }

  navigateToProjects(teamId: number){
    this.router.navigate(['/project',teamId,'projects']);
  }
  navigateToUpdateTask(taskId:number){
    this.router.navigate([`/task/${taskId}/update`]);
  }

deleteTask(taskId: number){
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
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks.set(res);
        this.isLouding.set(false);
        console.log("project id: "+this.projectId())
      },
      error: (err) => {
        this.error.set('Failed to load tasks');
        this.isLouding.set(false);
      },
      complete: () => {
         this.isLouding.set(false); }
    })
  }

  retry() {
    this.loudTasks();
  }
}
