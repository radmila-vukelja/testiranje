import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = 'http://localhost:8080/category';

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getOne(id: number) {
    return this.http.get<Category>(this.apiUrl + '/' + id, { headers: this.loginService.getHeaders() })
  }

  getAll() {
    return this.http.get<Category[]>(this.apiUrl + '/all', { headers: this.loginService.getHeaders() })
  }

  edit(narudzbina: Category){
    return this.http.put<Category>(this.apiUrl, narudzbina, { headers: this.loginService.getHeaders() });
  }

  save(narudzbina: Category) {
    return this.http.post<Category>(this.apiUrl, narudzbina, { headers: this.loginService.getHeaders() })
  }

  getDistinctCategories() {
    return this.http.get<string[]>(this.apiUrl + '/get-categories', { headers: this.loginService.getHeaders() })
  }

  findAllByGenderAndCategory(gender: string, category: string){
    return this.http.get<Category[]>(this.apiUrl + '/get-categories-by-gender/' + gender + '/' + category, { headers: this.loginService.getHeaders() })
  }
}
