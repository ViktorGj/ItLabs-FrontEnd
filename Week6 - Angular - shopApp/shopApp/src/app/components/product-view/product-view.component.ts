import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private productsService: ProductsService,
              private toastrService: ToastrService
              ) { }

  product = {} as Iproduct;
  productQuantity: number = 1;
  cartQuantity: number;

  ngOnInit() {
    this.viewProduct();
    this.cartQuantity = localStorage.length;
  }

  viewProduct() {
    const id = +this.activeRoute.snapshot.params.id;
    this.productsService.getProduct(id)
      .subscribe((res: Iproduct) => {
        this.product = res;
    });
  }

  addToCart(product){
    if (product.isAvailable){
      let isProductInCart = true;
      let keys = Object.keys(localStorage);
      for (let i=0; i<keys.length; i++){
        if (keys[i] == product.id){
          isProductInCart = false;
          break;
        }
      }
      if (isProductInCart){
        let value = [product, this.productQuantity]
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
