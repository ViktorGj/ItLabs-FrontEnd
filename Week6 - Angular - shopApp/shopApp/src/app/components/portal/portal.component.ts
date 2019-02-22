import { Component, OnInit, Input } from '@angular/core';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from '../../services/products.service'
import { TableService } from 'src/app/services/table.service';
import { Icategory } from 'src/app/models/category';
import { PortalService } from 'src/app/services/portal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private productsService: ProductsService,
              private tableService: TableService,
              private portalService: PortalService,
              private toastrService: ToastrService) { }

  productsList: Iproduct[];
  categories: Icategory[];
  product: Iproduct;
  cartQuantity: number;

  ngOnInit() {
    this.getProducts();
    this.showCategories();
    this.cartQuantity = localStorage.length;
    this.portalService.castProducts.subscribe(products => this.productsList = products);
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

  addToCart(product){
    if (product.isAvailable){
      let isProductInCart = true;
      let keys = Object.keys(localStorage);
      for (let i=0; i<keys.length; i++) {
        if (keys[i] == product.id){
          isProductInCart = false;
          break;
        }
      }
      if (isProductInCart){
        let quantity: number = 1;
        let value = [product, quantity]
        localStorage.setItem(product.id, JSON.stringify(value));
        this.cartQuantity = localStorage.length;
        this.toastrService.success("Product added to cart");
      }
      else {
        this.toastrService.warning("Product already in cart !")
      }
    }
    else {
      this.toastrService.warning("Product not available !");
    }
  }
  
}
