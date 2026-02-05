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
  projectService = inject(Projects);//// ???
  projects = signal<Project[]>([]); //// ??? 
  // today = inject(Date) 
  // today = signal<Date>(new Date().)
   

  addTaskForm = new FormGroup({
    projectId: new FormControl('',[Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl(''),
    status: new FormControl(''),
    priority: new FormControl(''),
    dueDate:new FormControl('')
  });
  error = signal<string | null>(null);

navigateToAllTasks(){
      this.router.navigate(['../'], { relativeTo: this.route });
}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('projectId');
      if (id) {
        this.projectId.set(parseInt(id));
      }
    });
    this.loudProjects(); //// ???

    if(this.projectId()){
    this.addTaskForm.patchValue({
      projectId:this.projectId()!.toString()
    })
    }
    // this.projectId()?valueChanges.subscribe(value=>{

    // })
    // // **תנאי דינמי: אם priority הוא high, assignee הופך לחובה**
    // this.addTaskForm.get('priority')?.valueChanges.subscribe(value => {
    //   const assigneeControl = this.addTaskForm.get('assignee');
    //  const today = new Date();
    // today().setHours(0, 0, 0, 0); // איפוס שעה לשוואה הוגנת
    // console.log('today==========',this.today)
   
  }

  loudProjects() {
    this.error.set(null);
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects.set(res);
        console.log('projects:', this.projects());
      },
      error: (err) => {
        this.error.set('Failed to load projects');
      },
      complete: () => {
      }
    })
  }

  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { projectId, title, description,status,priority,dueDate } = this.addTaskForm.value;
    // const project_id = projectId ? parseInt(projectId) : this.projectId()!

    if (typeof projectId == 'string'&&typeof title == 'string')
      this.taskService.addTask({ projectId: parseInt(projectId), title, description: description || null, status:status||null,priority:priority||null,dueDate:dueDate||null}).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Task successful', res);
          this.router.navigate(['../'], { relativeTo: this.route })

        },
        error: (err) => {
          this.error.set('Add Task failed. Please try again later.');
        },
      });
  }
}
