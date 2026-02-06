import { Component, inject, signal } from '@angular/core';
import { Comments } from '../../services/comments';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css',
})
export class AddComment {
  commentService = inject(Comments);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  taskId = signal<number | null>(null);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  addCommentForm = new FormGroup({
    body: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (id) {
        this.taskId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    if (!this.addCommentForm.valid) return;

    const { body } = this.addCommentForm.value;

    if (typeof body === 'string') {
      this.isLoading.set(true);
      this.error.set(null);

      this.commentService.addComment({
        taskId: this.taskId()!,
        body
      }).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('הערה נוספה בהצלחה!', 'הוספה מוצלחת');
          this.router.navigate(['../../../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.error.set('שגיאה בהוספת הערה');
          this.toastr.error('שגיאה בהוספת הערה', 'שגיאה');
        }
      });
    }
  }
}
