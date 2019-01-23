import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/categories';
  searchUrl = 'http://localhost:3000/categories?filter[limit]=1&filter[where][name][eq]=';



  addCategory(category: Icategory) {
    return this.http.post(this.apiUrl, category);
  }

  getCategories() : Observable <any> {
    return this.http.get(this.apiUrl);
  }

  deleteCategory(id) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  searchCategory(searchTerm) {
    return this.http.get(this.searchUrl + searchTerm);
  }

  updateCategory(id, category){
    return this.http.put(this.apiUrl + `/${id}`, category);
  }

}
