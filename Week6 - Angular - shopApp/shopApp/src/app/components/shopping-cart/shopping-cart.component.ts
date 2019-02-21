import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
  productsList: [];
  cartQuantity: number;
  sum: number;

  ngOnInit() {
    this.cartQuantity = localStorage.length;
    this.getFromCart();
    this.totalSum(this.productsList);
  }

  getFromCart() {
    let products: any = [];
    let keys = Object.keys(localStorage);
    for (let i=0; i<keys.length; i++) {
      let item: Iproduct = JSON.parse(localStorage.getItem(keys[i]));
      products.push(item);
    }
    this.totalSum(products);
    this.productsList = products;
  }

  changeProductQuantity(productId, newQuantity: number) {
    // take the product to change
    let item = JSON.parse(localStorage.getItem(productId));
    let product = item[0];
    let value = [product, newQuantity]
    localStorage.setItem(productId, JSON.stringify(value));
    this.totalSum(this.productsList);
  }

  itemSum(quantity, price) {
    return quantity * price;
  }

  totalSum(products){
    let sum: number = 0;
    for (let i=0; i<products.length; i++){
        sum += products[i][0].price * products[i][1];
    } 
    console.log(sum);
    this.sum = sum;
  }

  removeFromCart(productId){
    localStorage.removeItem(productId);
    this.cartQuantity = localStorage.length;
    this.getFromCart();
  }

  checkoutCart(){
    localStorage.clear();
    this.cartQuantity = localStorage.length;
    this.getFromCart();
  }

}
