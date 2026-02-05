import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/taskModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private url = `${environment.apiUrl}/tasks`;
  private httpClient = inject(HttpClient);

  getTasks(projectId: number | null): Observable<Task[]> {
    if (projectId) {
      return this.httpClient.get<Task[]>(`${this.url}?projectId=${projectId}`);
    }
    return this.httpClient.get<Task[]>(this.url);
  }

  addTask(task: { projectId: number, title: string, description: string | null, status: string | null, priority: string | null, due_date: string | null }): Observable<Task> {
    if (!task.status) task.status = 'todo'
    if (!task.priority) task.priority = 'normal'
    return this.httpClient.post<Task>(this.url, task);
  }

  updateTask(task: { id: number, title: string, description: string | null, status: string | null, priority: string | null, due_date: string | null }): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.url}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
