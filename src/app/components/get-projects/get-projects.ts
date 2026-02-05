import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../services/projects';
import { Project } from '../../models/projectModel';
import { CommonModule } from '@angular/common';
import { AddProject } from '../add-project/add-project';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-projects',
  standalone: true,
  imports: [CommonModule, AddProject],
  templateUrl: './get-projects.html',
  styleUrl: './get-projects.css',
})
export class GetProjects {
  projectService = inject(Projects);
  private router = inject(Router);
  // private activatedRoute=inject(ActivatedRoute)

  private route = inject(ActivatedRoute);
  projects = signal<Project[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);
  teamId = signal<number | null>(null);


  //   navigateToTasks() {
  //   this.router.navigate(['/tasks']);
  // }
  // this.router.navigate(['new'], { relativeTo: this.activatedRoute });

  navigateToTasks(projectId: number) {
    // this.router.navigate(['project', projectId, 'tasks']);
    this.router.navigate([projectId, 'tasks'], { relativeTo: this.route });
  }

  navigateToAddProject() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  navigateToAddMember() {
    console.log('teamId value:', this.teamId());
    this.router.navigate([`/teams/${this.teamId()}/member/new`]);
  }
    navigateToAllTeams() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('teamId');
      if (id) {
        // If teamId is present in the route, you can use it to filter projects
        console.log('Team ID from route:', id);
        this.teamId.set(parseInt(id));
        // You might want to implement filtering logic here based on teamId
      }
    });
    this.loudProjects();
    console.log('projects:', this.projects());
  }
  loudProjects() {
    this.isLouding.set(true);
    this.error.set(null);
    this.projectService.getProjects().subscribe({
      next: (res) => {
        const filteredProjects = res.filter(
          project => project.team_id == this.teamId()
        );
        this.projects.set(filteredProjects);
        console.log('projects:', this.projects());
        this.isLouding.set(false);
        // localStorage.setItem('projects',JSON.stringify(res)) //// ???
      },
      error: (err) => {
        this.error.set('Failed to load projects');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    })
  }

  retry() {
    this.loudProjects();
  }
}
