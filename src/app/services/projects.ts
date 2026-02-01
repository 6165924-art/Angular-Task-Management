import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projectModel';

@Injectable({
  providedIn: 'root',
})
export class Projects {
  private url = 'http://localhost:3000/api/projects'; // לעשות עם קובץ סביבה (.env)???
  private httpClient = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url);
  }

  addProject(project:{teamId: number, name:string, description:string|null}): Observable<Project> {
    console.log('in addProject service with name:', project);
    return this.httpClient.post<Project>(this.url, project);
  }
}
