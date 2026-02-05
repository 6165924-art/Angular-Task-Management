import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/commentModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Comments {
  private url = `${environment.apiUrl}/comments`;
  private httpClient = inject(HttpClient);

  getComments(taskId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.url}?taskId=${taskId}`);
  }

  addComment(comment: { taskId: number, body: string }): Observable<Comment> {
    return this.httpClient.post<Comment>(this.url, comment);
  }

}
