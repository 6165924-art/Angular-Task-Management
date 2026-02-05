import { Component, inject, signal } from '@angular/core';
import { Comments } from '../../services/comments';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css',
})
export class AddComment {
  commentService = inject(Comments);
  taskId = signal<number | null>(null)
  private route = inject(ActivatedRoute);
  router = inject(Router)

  addCommentForm = new FormGroup({
    body: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('taskId');
      if (id) {
        this.taskId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    const { body } = this.addCommentForm.value;
    if (typeof body == 'string')
      this.commentService.addComment({ taskId: this.taskId()!, body }).subscribe({
        next: (res) => {
          this.error.set(null);
          this.router.navigate(['../../../'], { relativeTo: this.route })
        },
        error: (err) => {
          this.error.set('Add Comment failed. Please try again later.');
        },
      });
  }
}
