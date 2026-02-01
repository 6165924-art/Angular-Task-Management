import { Component, inject, signal } from '@angular/core';
import { Comments } from '../../services/comments';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css',
})
export class AddComment {
  commentService = inject(Comments);
  addCommentForm = new FormGroup({
    taskId: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  error = signal<string | null>(null);
  onSubmit() {
    console.log('in onsubmit');
    // const project:Project = {team_id: this.addProjectForm.value.teamId!, name: this.addProjectForm.value.name!, description: this.addProjectForm.value.description!};
    const {taskId, body } = this.addCommentForm.value;
    if (typeof body == 'string'&& typeof taskId == 'string')
      this.commentService.addComment({taskId: parseInt(taskId), body}).subscribe({
        // this.auth.register({name,email,password}).subscribe({
        next: (res) => {
          this.error.set(null);
          console.log('Add Comment successful', res);
        },
        error: (err) => {
          this.error.set('Add Comment failed. Please try again later.');
        },
      });
  }
}
