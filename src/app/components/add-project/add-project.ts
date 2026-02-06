import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../services/projects';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-add-project',
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
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  projectService = inject(Projects);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  teamId = signal<number | null>(null);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  addProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('')
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    if (!this.addProjectForm.valid) return;

    const { name, description } = this.addProjectForm.value;

    if (typeof name === 'string') {
      this.isLoading.set(true);
      this.error.set(null);

      this.projectService.addProject({
        teamId: this.teamId()!,
        name,
        description: description || null
      }).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('הפרויקט נוסף בהצלחה!', 'הוספה מוצלחת');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בהוספת הפרויקט');
          this.toastr.error('שגיאה בהוספת הפרויקט', 'שגיאה');
        }
      });
    }
  }
}
