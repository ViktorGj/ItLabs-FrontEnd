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



  addProduct(product: Icategory) {
    return this.http.post(this.apiUrl, product);
  }

  getProducts() : Observable <any> {
    return this.http.get(this.apiUrl);
  }

  deleteProduct(id) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  searchProduct(searchTerm) {
    return this.http.get(this.searchUrl + searchTerm);
  }


}
