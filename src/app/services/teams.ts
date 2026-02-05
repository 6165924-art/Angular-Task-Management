import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team } from '../models/teamModel';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Teams {
  private url = `${environment.apiUrl}/teams`;
  private httpClient = inject(HttpClient);

  getTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.url);
  }

  addTeam(name: string): Observable<Team> {
    return this.httpClient.post<Team>(this.url, { name });
  }

  addMember(teamId: number, userId: number): Observable<{ userId: string }> {
    return this.httpClient.post<{ userId: string }>(`${this.url}/${teamId}/members`, { userId });
  }
}
