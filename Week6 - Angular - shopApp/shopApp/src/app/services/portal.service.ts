import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient) { }
  searchCategoryUrl = 'http://localhost:3000/products?filter[limit]=1&filter[where][categoryId][eq]=';

  filterProducts (id) {
    return this.http.get(this.searchCategoryUrl + id);
  }

}
