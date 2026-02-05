import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projectModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Projects {
  private url = `${environment.apiUrl}/projects`;
  private httpClient = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url);
  }

  addProject(project: { teamId: number, name: string, description: string | null }): Observable<Project> {
    return this.httpClient.post<Project>(this.url, project);
  }
}
