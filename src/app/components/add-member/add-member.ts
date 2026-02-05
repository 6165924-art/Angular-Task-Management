import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  teamService = inject(Teams);
  teamId = signal<number | null>(null)
  private route = inject(ActivatedRoute);
  router = inject(Router)


  addMemberForm = new FormGroup({
    userId: new FormControl('', [Validators.required])
  });
  error = signal<string | null>(null);

  navigateToAllProject() {
    this.router.navigate(['../../projects'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('teamId');
      if (id) {
        this.teamId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    const userId = this.addMemberForm.value.userId!;
    const user_id = Number(userId);
    if (typeof this.teamId() == 'number')
      this.teamService.addMember(this.teamId()!, user_id).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['/teams', this.teamId()!, 'projects'])
        },
        error: (err) => {
          this.error.set('Add member failed. Please try again later.');
        },
      });
  }

}
