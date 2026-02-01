import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/taskModel';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private url = 'http://localhost:3000/api/tasks'; // לעשות עם קובץ סביבה (.env)???
  private httpClient = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url);
  }

  addTask(task: { projectId: number, title: string, description: string | null }): Observable<Task> {
    console.log('in addTask service with task:', task);
    return this.httpClient.post<Task>(this.url, task);
  }

  updateTask(task: { id: number, title: string, description: string | null }): Observable<Task> {
    console.log('in updateTask service with task:', task);
    return this.httpClient.patch<Task>(`${this.url}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    console.log('in deleteTask service with id:', id);
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
