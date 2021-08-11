import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiUrl = 'http://localhost:8080/location';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<Location>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Location[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(location: Location){
    return this.http.put<Location>(this.apiUrl, location, { headers: this.loginService.getHeaders() });
  }

  save(location: Location) {
    return this.http.post<Location>(this.apiUrl, location, { headers: this.loginService.getHeaders() })
  }

  findByName(name: string){
    return this.http.get<Location[]>(this.apiUrl + '/find-by-name/' + name, { headers: this.loginService.getHeaders() })
  }

}
