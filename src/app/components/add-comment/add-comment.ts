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
    // taskId: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log('ניתוב: ', this.route);

      const id = params.get('taskId');
      if (id) {
        this.taskId.set(parseInt(id));
      }
    });
  }

  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const { body } = this.addCommentForm.value;
    if (typeof body == 'string')
      this.commentService.addComment({ taskId: this.taskId()!, body }).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Comment successful', res);
          console.log('ניתוב בתוך הנקסט: ', this.route);
          this.router.navigate(['../../../'], { relativeTo: this.route })
        },
        error: (err) => {
          this.error.set('Add Comment failed. Please try again later.');
        },
      });
  }
}
