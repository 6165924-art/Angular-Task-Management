import { Component, inject, signal } from '@angular/core';
import { Teams } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/teamModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-teams.html',
  styleUrl: './get-teams.css',
})
export class GetTeams {
  teamService = inject(Teams);
  router = inject(Router);

  teams = signal<Team[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);

  navigateToAddTeam() {
    this.router.navigate(['/teams/new']);
  }

  navigateToProjects(teamId: number) {
    this.router.navigate(['/teams', teamId, 'projects']);
  }

  ngOnInit() {
    this.loudTeams();
  }
  loudTeams() {
    this.isLouding.set(true);
    this.error.set(null);
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams.set(res);
        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load teams');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    })
  }

  retry() {
    this.loudTeams();
  }
}
