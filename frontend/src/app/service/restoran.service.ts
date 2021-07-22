import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Restoran } from '../model/restoran';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  apiUrl = 'http://localhost:8080/restoran';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  dajSveRestorane() {
    return this.http.get<Restoran[]>(this.apiUrl, { headers: this.loginService.getHeaders() })
  }

  dodajRestoran(restoran: Restoran) {
    return this.http.post<Restoran>(this.apiUrl, restoran, { headers: this.loginService.getHeaders() })
  }

}
