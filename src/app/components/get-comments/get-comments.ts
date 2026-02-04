import { Component, inject, Input, signal } from '@angular/core';
import { Comments } from '../../services/comments';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/commentModel';
import { GetTasks } from '../get-tasks/get-tasks';

@Component({
  selector: 'app-get-comments',
  standalone: true,
  imports: [],
  templateUrl: './get-comments.html',
  styleUrl: './get-comments.css',
})
export class GetComments {
  commentService = inject(Comments);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  @Input() taskId: number | null = null;
  // @Input()taskId=signal<number|null>(null);

  comments = signal<Comment[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);
  // taskId = signal<number | null>(null);

  navigateToAddComment() {
    this.router.navigate([`${this.taskId}/comments/new`], { relativeTo: this.route });
  }

  ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('taskId');
    //   if (id) {
    //     this.taskId.set(parseInt(id));
    //   }
    // })
    this.loudComments();
  }
  loudComments() {
    this.isLouding.set(true);
    this.error.set(null);
    this.commentService.getComments(this.taskId!).subscribe({
      next: (res) => {
        const filteredComments = res.filter(
          comment=>comment.task_id==this.taskId
        ); 
        this.comments.set(filteredComments);
        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load Comments');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    })
  }
}
