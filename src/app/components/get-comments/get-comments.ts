import { Component, inject, Input, signal } from '@angular/core';
import { Comments } from '../../services/comments';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../models/commentModel';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AddComment } from '../add-comment/add-comment';

@Component({
  selector: 'app-get-comments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    AddComment
  ],
  templateUrl: './get-comments.html',
  styleUrl: './get-comments.css',
})
export class GetComments {
  commentService = inject(Comments);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  @Input() taskId: number | null = null;

  comments = signal<Comment[]>([]);
  isLouding = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.isLouding.set(true);
    this.error.set(null);
    this.commentService.getComments(this.taskId!).subscribe({
      next: (res) => {
        const filteredComments = res.filter(
          comment => comment.task_id == this.taskId
        );
        this.comments.set(filteredComments);
        this.isLouding.set(false);
      },
      error: (err) => {
        this.error.set('שגיאה בטעינת ההערות');
        this.isLouding.set(false);
      },
      complete: () => {
        this.isLouding.set(false);
      }
    });
  }

  navigateToAddComment() {
    this.router.navigate([`${this.taskId}/comments/new`], { relativeTo: this.route });
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
