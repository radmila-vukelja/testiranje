import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './login.service';
import { Narudzbina } from '../model/narudzbina';

@Injectable({
  providedIn: 'root'
})
export class NarudzbinaService {

  apiUrl = 'http://localhost:8080/narudzbina';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<Narudzbina>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Narudzbina[]>(this.apiUrl, { headers: this.loginService.getHeaders() })
  }

  izmeniNarudzbinu(narudzbina: Narudzbina){
    return this.http.put<Narudzbina>(this.apiUrl, narudzbina, { headers: this.loginService.getHeaders() });
  }

  save(narudzbina: Narudzbina) {
    return this.http.post<Narudzbina>(this.apiUrl, narudzbina, { headers: this.loginService.getHeaders() })
  }

  delete(id: number) {
    return this.http.delete<Narudzbina[]>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  dajNarudzbinePoIdKorisnika(id: string) {
    return this.http.get<Narudzbina[]>(this.apiUrl + '/daj-narudzbine/' + id, { headers: this.loginService.getHeaders() });
  }

}
