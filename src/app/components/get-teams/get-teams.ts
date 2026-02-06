import { Component, inject, signal } from '@angular/core';
import { Teams } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/teamModel';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-teams',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './get-teams.html',
  styleUrl: './get-teams.css',
})
export class GetTeams {
  teamService = inject(Teams);
  router = inject(Router);
  private toastr = inject(ToastrService);

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
    this.loadTeams();
  }

  loadTeams() {
    this.isLouding.set(true);
    this.error.set(null);
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams.set(res);
        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('שגיאה בטעינת הקבוצות');
        this.toastr.error('שגיאה בטעינת הקבוצות', 'שגיאה');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    });
  }

  retry() {
    this.loadTeams();
  }
}
