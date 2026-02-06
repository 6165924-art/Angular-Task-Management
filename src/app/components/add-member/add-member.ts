import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-member',
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
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  teamService = inject(Teams);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  teamId = signal<number | null>(null);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  addMemberForm = new FormGroup({
    userId: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('teamId');
      if (id) {
        this.teamId.set(parseInt(id));
      }
    });
  }

  navigateToAllProject() {
    this.router.navigate(['../../projects'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.addMemberForm.valid) return;

    const userId = this.addMemberForm.value.userId!;
    const user_id = Number(userId);

    if (typeof this.teamId() === 'number') {
      this.isLoading.set(true);
      this.error.set(null);

      this.teamService.addMember(this.teamId()!, user_id).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('החבר הוסף בהצלחה!', 'הוספה מוצלחת');
          this.router.navigate(['/teams', this.teamId()!, 'projects']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בהוספת החבר. בדוק אם מזהה המשתמש קיים.');
          this.toastr.error('שגיאה בהוספת החבר', 'שגיאה');
        }
      });
    }
  }
}
