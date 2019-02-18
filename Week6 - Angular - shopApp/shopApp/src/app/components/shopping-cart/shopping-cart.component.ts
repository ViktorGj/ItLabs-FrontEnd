import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
  productsList: Iproduct[];
  cartQuantity: number;

  ngOnInit() {
    this.cartQuantity = localStorage.length;
  }

  getFromCart() {
    let products: Iproduct[] = [];
    let keys = Object.keys(localStorage);
    for (let i=0; i<keys.length; i++) {
      let item: Iproduct = JSON.parse(localStorage.getItem(keys[i]));
      products.push(item);
    }
    this.productsList = products;
  }

  // GET PRODUCTS

}
