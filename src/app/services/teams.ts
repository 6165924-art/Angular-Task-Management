import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team } from '../models/teamModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Teams {
  private url = 'http://localhost:3000/api/teams'; // לעשות עם קובץ סביבה (.env)???
  private httpClient = inject(HttpClient);

  getTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.url);
  }

  addTeam(name: string): Observable<Team> {
    console.log('in addTeam service with name:', name);
    return this.httpClient.post<Team>(this.url, { name });
  }

  addMember(teamId: number, userId: number): Observable<{ userId: string }> {
    return this.httpClient.post<{ userId: string }>(`${this.url}/${teamId}/members`, { userId });
  }
}
