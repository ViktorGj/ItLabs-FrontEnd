import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/products';

  getProducts() : Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProduct(id) {
    return this.http.get(this.apiUrl + `/${id}`);
  }

  addProduct(product: Iproduct){
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id, product){
    return this.http.put(this.apiUrl +`/${id}`, product)
  }

  deleteProduct(id){
    return this.http.delete(this.apiUrl + `/${id}`);
  }

}
