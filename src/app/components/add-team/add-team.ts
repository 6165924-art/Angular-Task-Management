import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
  teamService = inject(Teams);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  addTeamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  navigateToAllTeams() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.addTeamForm.valid) return;

    const teamName = this.addTeamForm.value.name!;

    if (typeof teamName === 'string') {
      this.isLoading.set(true);
      this.error.set(null);

      this.teamService.addTeam(teamName).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('הקבוצה נוספה בהצלחה!', 'הוספה מוצלחת');
          this.navigateToAllTeams();
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בהוספת הקבוצה');
          this.toastr.error('שגיאה בהוספת הקבוצה', 'שגיאה');
        }
      });
    }
  }
}
