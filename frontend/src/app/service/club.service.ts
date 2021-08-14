import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Club } from '../model/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  apiUrl = 'http://localhost:8080/club';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<Club>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Club[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(club: Club) {
    return this.http.put<Club>(this.apiUrl, club, { headers: this.loginService.getHeaders() });
  }

  save(club: Club) {
    return this.http.post<Location>(this.apiUrl, club, { headers: this.loginService.getHeaders() })
  }

  deleteClub(clubId) {
    return this.http.delete<Club[]>(this.apiUrl + '/' + clubId, { headers: this.loginService.getHeaders() });
  }

  removeContenstantFromClub(clubId, contestantId) {
    return this.http.delete<Club[]>(this.apiUrl + '/' + clubId + '/' + contestantId, { headers: this.loginService.getHeaders() });
  }

  addContestantToAClub(clubId, contestantId) {
    return this.http.get<Club[]>(this.apiUrl + '/add-contestant/' + clubId + '/' + contestantId, { headers: this.loginService.getHeaders() });
  }

}
