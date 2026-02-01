import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/commentModel';

@Injectable({
  providedIn: 'root',
})
export class Comments {
  private url = 'http://localhost:3000/api/comments'; // לעשות עם קובץ סביבה (.env)???
  private httpClient = inject(HttpClient);

  getComments(taskId:number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.url}?taskId=${taskId}`);
  }

  addComment(comment:{taskId:number,body: string}): Observable<Comment> {
    console.log('in addComment service with comment:', comment);
    return this.httpClient.post<Comment>(this.url, comment);
  }
  
}
