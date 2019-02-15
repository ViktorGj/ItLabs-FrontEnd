import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service'
import { TableService } from 'src/app/services/table.service';
import { Icategory } from 'src/app/models/category';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private tableService: TableService,
              private portalService: PortalService ) { }

  productsList: Iproduct[];
  categories: Icategory[];
  searchWord: string;
  product: Iproduct;
  productsInCart: Iproduct[] = [];
  cartQuantity: number;

  ngOnInit() {
    this.getProducts();
    this.showCategories();
    this.cartQuantity = localStorage.length;
  }

  getProducts() {
    this.productsService.getProducts()
      .subscribe(data => {
        this.productsList = data;
        console.log(data);
      })
  }

  selectProducts(id){
    this.portalService.filterProducts(id)
      .subscribe((data: Iproduct[]) => {
        this.productsList = data;
      })
  }

  showCategories(){
    this.tableService.getCategories()
      .subscribe( data => {
        this.categories = data;
    })
  }

  searchProducts(){
    this.productsService.searchProduct(this.searchWord)
      .subscribe( (data:Iproduct[]) => {
        this.productsList = data;
      })
  }

  isEmpty(event){
    if(event == ""){
      this.getProducts();
    }
  }

 
  addToCart(product){
    let products: Iproduct[] = [];
    localStorage.setItem(product.id, JSON.stringify(product));
    this.cartQuantity = localStorage.length;
    let keys = Object.keys(localStorage);
    console.log(keys);
    for (let i=0; i<keys.length; i++) {
      let item: Iproduct = JSON.parse(localStorage.getItem(keys[i]));
      products.push(item);
    }
    this.productsInCart = products;
    console.log(this.productsInCart);
  }
  
}
