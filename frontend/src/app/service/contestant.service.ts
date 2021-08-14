import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contestant } from '../model/contestant';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ContestantService {

  apiUrl = 'http://localhost:8080/contestant';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }


  getOne(id: number) {
    return this.http.get<Contestant>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Contestant[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(contestant: Contestant) {
    return this.http.put<Contestant>(this.apiUrl, contestant, { headers: this.loginService.getHeaders() });
  }

  save(contestant: Contestant) {
    return this.http.post<Contestant>(this.apiUrl, contestant, { headers: this.loginService.getHeaders() })
  }

  getAllContestantsWithoutClub() {
    return this.http.get<Contestant[]>(this.apiUrl + '/all-without-club', { headers: this.loginService.getHeaders() })
  }

  delete(id) {
    return this.http.delete<Contestant[]>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }
}
