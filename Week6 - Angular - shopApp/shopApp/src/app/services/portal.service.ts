import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Iproduct } from '../models/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private http: HttpClient,
              private productsService: ProductsService) { }
              
  searchCategoryUrl = 'http://localhost:3000/products?filter[limit]=1&filter[where][categoryId][eq]=';
  private searchedProducts = new BehaviorSubject<Iproduct[]>([]);
  castProducts = this.searchedProducts.asObservable(); // castProducts - observes changes of searchedProducts, and can be used in components to track changes

  filterProducts (id) {
    return this.http.get(this.searchCategoryUrl + id);
  }

  searchProducts (searchString) {
    if(searchString == ""){
      this.productsService.getProducts()
        .subscribe((res:Iproduct[]) => {
          this.searchedProducts.next(res);
      })
    }
    else {
      this.productsService.searchProduct(searchString)
        .subscribe((data:Iproduct[]) => {
         this.searchedProducts.next(data);
      })
    }
  }

}
